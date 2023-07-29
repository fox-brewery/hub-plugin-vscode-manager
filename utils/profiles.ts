import { promises as fs } from 'node:fs'
import * as path from 'node:path'

import * as vars from './vars'

export async function getProfiles() {
	const globalStorage: vars.StorageJson = JSON.parse(
		await fs.readFile(vars.globalStorageJsonFile, 'utf-8'),
	)

	return globalStorage.userDataProfiles
}

export async function getGlobalStorage() {
	const globalStorage: vars.StorageJson = JSON.parse(
		await fs.readFile(vars.globalStorageJsonFile, 'utf-8'),
	)

	return globalStorage
}
