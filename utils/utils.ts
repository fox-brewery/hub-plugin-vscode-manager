import * as util from 'node:util'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import * as child_process from 'node:child_process'
import * as jsoncParser from 'jsonc-parser'

const exec = util.promisify(child_process.exec)

import * as vars from './vars'
import { getProfiles } from './profiles'

export function fileExists(filepath: string) {
	return fs
		.access(filepath, fs.constants.F_OK | fs.constants.W_OK)
		.then(() => true)
		.catch(() => false)
}

export function normalizePath(path: string): string {
	if (path.indexOf(vars.vscode.userDir) == 0) {
		return '...' + path.slice(vars.vscode.userDir.length)
	}

	return path
}

export async function sendNotification(message: string) {
	try {
		const { stderr } = await exec(`notify-send "${message}"`)
		if (stderr) {
			console.error('notify-send stderr:', stderr)
		}
	} catch (err) {
		console.error(err)
	}
}

export async function assertValidJson(filepath: string, content: string) {
	try {
		const errors: jsoncParser.ParseError[] = []
		jsoncParser.parse(content, errors)

		if (errors.length > 0) {
			await sendNotification(
				`Skipping file '${filepath} (parse failed - invalid jsonc)`,
			)
			return false
		}

		return true
	} catch {
		await sendNotification(
			`Skipping file '${filepath} (parse failed - invalid jsonc)`,
		)

		return false
	}
}

export function getLocationFromPath(filepath: string): string {
	return path.basename(path.dirname(filepath))
}

export async function getProfileNameFromPath(filepath: string) {
	const location = getLocationFromPath(filepath)

	const profiles = await getProfiles()
	for (const profile of profiles) {
		if (profile.location === location) {
			return profile.name
		}
	}

	return ''
}
