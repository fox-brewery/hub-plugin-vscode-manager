import * as util from 'node:util'
import { promises as fs } from 'node:fs'
import * as path from 'node:path'
import * as child_process from 'node:child_process'

const exec = util.promisify(child_process.exec)

import * as vars from './vars'
import { getProfiles } from './profiles'
import { ignoreWatch } from '../watch-data'
import {
	assertValidJson,
	sendNotification,
	getLocationFromPath,
	fileExists,
} from './utils'

export async function createKeybindingsFile(filepath: string) {
	console.log('Creating keybindings... ' + filepath)

	ignoreWatch.value = true
	const newInputFile = await (async () => {
		// newInput file some other profile that's not the new one
		const location = getLocationFromPath(filepath)
		let anyProfile = (await getProfiles())[0]
		if (anyProfile.location === location) {
			anyProfile = (await getProfiles())[1]
		}

		const anyInputFile = path.join(
			vars.profileDir,
			anyProfile.location,
			'keybindings.json',
		)

		// Other keybindings.json has to exist, or we go in infinite loop
		if (!(await fileExists(anyInputFile))) {
			throw new Error(`File should exist: ${anyInputFile}`)
		}
		return anyInputFile
	})()
	await fs.copyFile(newInputFile, filepath)
	ignoreWatch.value = false
}

export async function updateKeybindingsFile(inputFile: string) {
	console.log('Writing keybindings...')

	const location = getLocationFromPath(inputFile)

	const inputContent = await fs.readFile(inputFile, 'utf-8')
	if (!(await assertValidJson(inputFile, inputContent))) return

	ignoreWatch.value = true
	const profiles = await getProfiles()
	for (const profile of profiles) {
		const outputFile = path.join(
			vars.vscode.profileDir,
			profile.location,
			'keybindings.json',
		)
		if (!(await fileExists(outputFile))) {
			continue
		}

		if (profile.location !== location) {
			const content = await fs.readFile(inputFile, 'utf-8')
			await fs.writeFile(outputFile, content)
		}
	}
	ignoreWatch.value = false

	await sendNotification('Updated VSCode Keybindings')
}
