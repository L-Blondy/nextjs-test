import { promises as fs } from 'fs'
import path, { join } from 'path'
import some_file from 'src/files/file.json'

export class File {

	static async read<T extends unknown>(absPath: string): Promise<T> {
		const filePath = path.join(process.cwd(), absPath)
		console.log(process.cwd())
		console.log(__dirname)
		console.log(some_file)

		try {
			// const fileContent = await fs.readFile(filePath, 'utf8')
			return { ...some_file, __dirname, cwd: process.cwd() } as T //JSON.parse(fileContent) as T
		}
		catch (e) {
			return e
		}
	}

	static async write(absPath: string, data: string | Uint8Array | object): Promise<void> {
		const filePath = path.join(process.cwd(), absPath)

		if (typeof data === 'object') {
			data = JSON.stringify(data)
		}
		try {
			return await fs.writeFile(filePath, data)
		}
		catch (e) {
			return e
		}
	}
}