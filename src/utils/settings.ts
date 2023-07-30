import * as path from 'node:path'
import * as fs from 'node:fs/promises'

import * as vars from './vars'
import {
	sendNotification,
	assertValidJson,
	getLocationFromPath,
	getProfileNameFromPath,
	fileExists,
} from './utils'
import { getProfiles } from './profiles'
import { ignoreWatch } from '../watch-data'

export async function createSettingsFile(filepath: string) {
	console.log('Creating settings... ' + filepath)

	ignoreWatch.value = true
	await fs.writeFile(
		filepath,
		`{
	//section-start: custom
	//section-end: custom

	//section-start: shared
	//section-end: shared
	"__hack": ""
}`,
	)
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
			'settings.json',
		)

		// Other settings.json has to exist, or we go in infinite loop
		if (!(await fileExists(anyInputFile))) {
			throw new Error(`File should exist: ${anyInputFile}`)
		}
		return anyInputFile
	})()
	await writeSettingsOther(newInputFile, filepath)
	ignoreWatch.value = false
}

export async function updateSettingsFile(inputFile: string) {
	console.log('Writing settings...')

	const location = getLocationFromPath(inputFile)

	const inputContent = await fs.readFile(inputFile, 'utf-8')
	if (!(await assertValidJson(inputFile, inputContent))) return

	ignoreWatch.value = true
	const profiles = await getProfiles()
	for (const profile of profiles) {
		const outputFile = path.join(
			vars.vscode.profileDir,
			profile.location,
			'settings.json',
		)
		if (!(await fileExists(outputFile))) {
			continue
		}

		if (profile.location === location) {
			await writeSettingsCurrent(inputFile)
		} else {
			await writeSettingsOther(inputFile, outputFile)
		}
	}
	ignoreWatch.value = false

	await sendNotification('Updated VSCode Settings')
}

/**
 * This only copies everything after the "shared" section.
 */
async function writeSettingsCurrent(inputFile: string): Promise<void> {
	const inputContent = await fs.readFile(inputFile, 'utf-8')
	const parsedInput = await parseSettingsContent(inputContent)
	if (!parsedInput) {
		await sendNotification(
			`Skipping file '${inputFile} (parse failed - bad input section comments)`,
		)
		return
	}

	const profileName = await getProfileNameFromPath(inputFile)
	parsedInput.beforeCustomText = `{\n\t// PROFILE: ${profileName}\n\n\t`

	let text = parsedInput.afterSharedText.slice('//section-end: shared'.length)
	text = text.trim()
	text = text.slice('"__hack": "",'.length)
	text = text.trim()
	text = text.slice(0, -1) // }
	text = text.trim()

	if (text) {
		parsedInput.customText += text + ',\n\t'
	}

	parsedInput.afterSharedText = parsedInput.afterSharedText.slice(
		0,
		'//section-end: shared'.length,
	)
	parsedInput.afterSharedText += '\n\t"__hack": ""\n}\n'

	const newOutputContent = stringifySettingsContent(parsedInput)
	await fs.writeFile(inputFile, newOutputContent)
}

/**
 * @description This only copies the stuff in the "shared" section.
 */
async function writeSettingsOther(
	inputFile: string,
	outputFile: string,
): Promise<void> {
	const inputContent = await fs.readFile(inputFile, 'utf-8')
	const outputContent = await fs.readFile(outputFile, 'utf-8')

	const parsedInput = await parseSettingsContent(inputContent)
	const parsedOutput = await parseSettingsContent(outputContent)

	if (!parsedInput) {
		await sendNotification(
			`Skipping file '${inputFile} (parse failed - bad input section comments)`,
		)
		return
	}

	if (!parsedOutput) {
		await sendNotification(
			`Skipping file '${outputFile} (parse failed - bad output section comments)`,
		)
		return
	}

	const profileName = await getProfileNameFromPath(outputFile)
	parsedOutput.beforeCustomText = `{\n\t// PROFILE: ${profileName}\n\n\t`

	parsedOutput.sharedText = parsedInput.sharedText

	const newOutputContent = stringifySettingsContent(parsedOutput)
	await fs.writeFile(outputFile, newOutputContent)
}

type Parsed = {
	beforeCustomText: string
	customText: string
	betweenText: string
	sharedText: string
	afterSharedText: string
}

export async function parseSettingsContent(
	content: string,
): Promise<Parsed | null> {
	const customStartIndex = content.indexOf('//section-start: custom')
	const customEndIndex = content.indexOf('//section-end: custom')
	const sharedStartIndex = content.indexOf('//section-start: shared')
	const sharedEndIndex = content.indexOf('//section-end: shared')

	if (
		customStartIndex !== -1 &&
		customEndIndex !== -1 &&
		sharedStartIndex !== -1 &&
		sharedEndIndex !== -1
	) {
		const beforeCustomText = content.slice(0, customStartIndex)
		const customText = content.slice(customStartIndex, customEndIndex)
		const betweenText = content.slice(customEndIndex, sharedStartIndex)
		const sharedText = content.slice(sharedStartIndex, sharedEndIndex)
		const afterSharedText = content.slice(sharedEndIndex)

		return {
			beforeCustomText,
			customText,
			betweenText,
			sharedText,
			afterSharedText,
		}
	} else {
		// console.log('content', content)
		// console.log(
		// 	customStartIndex,
		// 	customEndIndex,
		// 	sharedStartIndex,
		// 	sharedEndIndex,
		// )

		return null
	}
}

export function stringifySettingsContent(parsed: Parsed) {
	return (
		parsed.beforeCustomText +
		parsed.customText +
		parsed.betweenText +
		parsed.sharedText +
		parsed.afterSharedText
	)
}
