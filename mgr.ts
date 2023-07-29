import * as fs from 'node:fs/promises'
import * as chokidar from 'chokidar'
import _ from 'lodash'

import * as vars from './utils/vars'
import { fileExists, normalizePath } from './utils/utils'
import { ignoreWatch } from './watch-data'
import { createNewSettingsFile, updateSettings } from './utils/settings'
import { updateKeybindings } from './utils/keybindings'
import path from 'node:path'
import { getProfiles } from './utils/profiles'

const DEBOUNCE_TIME_MILLISECONDS = 200

const throttledUpdateKeybindings = _.debounce(async (path: string) => {
	await updateKeybindings(path)
}, DEBOUNCE_TIME_MILLISECONDS)

const throttledUpdateSettings = _.debounce(async (path: string) => {
	await updateSettings(path)
}, DEBOUNCE_TIME_MILLISECONDS)

// {
// 	(async () => {
// 		const profiles = await getProfiles()
// 		for (const profile of profiles) {
// 			console.log(`printf '%s\\n' "REINSTALLING EXTENSIONS FOR PROFILE ${profile.name}"
// code --profile ${profile.name} --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-core
// code --profile ${profile.name} --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-unix
// code --profile ${profile.name} --uninstall-extension EdwinKofler.vscode-hyperupcall-pack-${profile.name.toLowerCase().split('-')[1]}
// for extension in $(code --profile ${profile.name} --list-extensions); do
// 	code --profile ${profile.name} --uninstall-extension "$extension"
// done
// for extension in EdwinKofler.vscode-hyperupcall-pack-core EdwinKofler.vscode-hyperupcall-pack-unix EdwinKofler.vscode-hyperupcall-pack-${profile.name.toLowerCase().split('-')[1]}; do
// 	code --profile ${profile.name} --install-extension "$extension"
// done
// unset -v extension
// `)
// 		}
// 	})()

// }

let watchTotal = 0
console.log('Starting watch...')
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
				await updateSettings(settingsJson)
			}

			if (!(await fileExists(keybindingsJson))) {
				await updateKeybindings(keybindingsJson)
			}
		}
	})
	.on('change', (filepath) => {
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
		} else if (filepath.endsWith('settings.json')) {
			throttledUpdateSettings(filepath)
		}
	})
	.on('ready', () => {
		console.log(`Watching ${watchTotal} files...`)
	})
