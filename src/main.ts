import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as util from 'node:util'
import * as c from 'ansi-colors'
import * as chokidar from 'chokidar'
import _ from 'lodash'

import * as vars from './utils/vars'
import { fileExists, normalizePath, sendNotification } from './utils/utils'
import { ignoreWatch } from './watch-data'
import {
	createSettingsFile,
	parseSettingsContent2,
	updateSettingsFile,
} from './utils/settings'
import {
	createKeybindingsFile,
	updateKeybindingsFile,
} from './utils/keybindings'
import { getProfiles } from './utils/profiles'

{
	function showHelp() {
		console.info(`Usage: mgr [options] [command]

Commands:
	start-server  Start the server
	print-vscode Prints VSCode script

Options:
	-h, --help     display help for command
`)
	}

	const { values, positionals } = util.parseArgs({
		options: {
			help: {
				type: 'string',
				short: 'h',
			},
		},
		allowPositionals: true,
	})
	if (values.help) {
		showHelp()
		process.exit(0)
	}
	if (positionals.length === 0) {
		showHelp()
		console.error(c.red.bold('No command specified'))
		process.exit(1)
	}

	const subcommand = positionals[0]
	if (subcommand === 'start-server') {
		commandStartServer()
	} else if (subcommand === 'print-vscode') {
		commandPrintVSCode()
	} else {
		showHelp()
		console.error(c.red.bold(`Unknown command: ${subcommand}`))
		process.exit(1)
	}
}
;(async () => {
	const p = '/home/edwin/.config/Code/User/profiles/-89c1b14/settings.json'
	parseSettingsContent2(await fs.readFile(p, 'utf-8'))
})()

function commandStartServer() {
	const DEBOUNCE_TIME_MILLISECONDS = 500

	const throttledUpdateKeybindings = _.debounce(async (path: string) => {
		await updateKeybindingsFile(path)
	}, DEBOUNCE_TIME_MILLISECONDS)

	const throttledUpdateSettings = _.debounce(async (path: string) => {
		await updateSettingsFile(path)
	}, DEBOUNCE_TIME_MILLISECONDS)

	let watchTotal = 0
	console.info(c.blue.bold('Starting watch...'))
	chokidar
		.watch(vars.profileDir)
		.on('add', (filepath) => {
			watchTotal += 1
		})
		.on('addDir', async (dirpath) => {
			const name = path.basename(path.dirname(dirpath))
			if (name === 'profiles') {
				const settingsJson = path.join(dirpath, 'settings.json')
				const keybindingsJson = path.join(dirpath, 'keybindings.json')

				if (!(await fileExists(settingsJson))) {
					await createSettingsFile(settingsJson)
				}

				if (!(await fileExists(keybindingsJson))) {
					await createKeybindingsFile(keybindingsJson)
				}
			}
		})
		.on('change', async (filepath) => {
			if (
				filepath.endsWith('.vscdb') ||
				filepath.endsWith('.vscdb-journal') ||
				filepath.endsWith('extensions.json')
			) {
				return
			}
			if (ignoreWatch.value) return

			const normalizedPath = normalizePath(filepath)
			console.info('change', normalizedPath)

			if (filepath.endsWith('keybindings.json')) {
				throttledUpdateKeybindings(filepath)
				await sendNotification('Updated VSCode Keybindings')
			} else if (filepath.endsWith('settings.json')) {
				throttledUpdateSettings(filepath)
				await sendNotification('Updated VSCode Settings')
			}
		})
		.on('ready', () => {
			console.log(`Watching ${watchTotal} files...`)
		})
}

function commandPrintVSCode() {
	;(async () => {
		const profiles = await getProfiles()
		for (const profile of profiles) {
			console.log(`printf '%s\\n' "REINSTALLING EXTENSIONS FOR PROFILE ${
				profile.name
			}"
code --profile ${
				profile.name
			} --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
code --profile ${
				profile.name
			} --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
code --profile ${
				profile.name
			} --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-${
				profile.name.toLowerCase().split('-')[1]
			}
for extension in $(code --profile ${profile.name} --list-extensions); do
	code --profile ${profile.name} --uninstall-extension "$extension"
done
for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-${
				profile.name.toLowerCase().split('-')[1]
			}; do
	code --profile ${profile.name} --install-extension "$extension"
done
unset -v extension
`)
		}
	})()
}
