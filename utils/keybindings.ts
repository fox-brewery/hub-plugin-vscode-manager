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

export async function updateKeybindings(inputFile: string) {
	if (!(await fileExists(inputFile))) {
		console.log('Creating keybindings... ' + inputFile)

		ignoreWatch.value = true
		const newInputFile = await (async () => {
			// newInput file some other profile that's not the new one
			const location = getLocationFromPath(inputFile)
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
		await creatNewKeybindingsFile(newInputFile, inputFile)
		ignoreWatch.value = false

		return
	}
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
			await writeKeybindings(inputFile, outputFile)
		}
	}
	ignoreWatch.value = false

	await sendNotification('Updated VSCode Keybindings')
}

export async function readKeybindings(name?: string): Promise<string> {
	if (!name) {
		name = (await getProfiles())[0].name
	}

	const keybindingsFile = await keybindingsFileFromProfileName(name)

	return await fs.readFile(keybindingsFile, 'utf-8')
}

export async function writeKeybindings(
	inputFile: string,
	outputFile: string,
): Promise<void> {
	const content = await fs.readFile(inputFile, 'utf-8')

	await fs.writeFile(outputFile, content)
}

async function keybindingsFileFromProfileName(name: string): Promise<string> {
	const storageJson: vars.StorageJson = JSON.parse(
		await fs.readFile(vars.globalStorageJsonFile, 'utf-8'),
	)
	const profileObj = storageJson.userDataProfiles.find(
		(obj) => obj.name === name,
	)
	if (!profileObj) {
		throw new Error(`Failed to find profile with name of ${name}`)
	}

	const keybindingsFile = path.join(
		vars.profileDir,
		profileObj.location,
		'keybindings.json',
	)
	return keybindingsFile
}

async function creatNewKeybindingsFile(
	newInputFile: string,
	inputFile: string,
) {
	await fs.copyFile(newInputFile, inputFile)
}
