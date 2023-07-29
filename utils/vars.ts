import * as os from 'node:os'
import * as path from 'node:path'

const xdgConfigHomeDir =
	process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config')

const vscodeDir = path.join(xdgConfigHomeDir, 'Code')

export const vscode = {
	userDir: path.join(vscodeDir, 'User'),
	profileDir: path.join(vscodeDir, 'User/profiles'),
	globalStorageJsonFile: path.join(
		vscodeDir,
		'User/globalStorage/storage.json',
	)
}

export const userDir = path.join(vscodeDir, 'User')
export const profileDir = path.join(vscodeDir, 'User/profiles')
export const globalStorageJsonFile = path.join(
	vscodeDir,
	'User/globalStorage/storage.json',
)

export type Profile = {
	location: string
	name: string
}

export type StorageJson = {
	userDataProfiles: Profile[]
}
