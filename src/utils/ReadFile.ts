import { promises as fs } from 'fs'
import path from 'path'

export class ReadFile {

	static async JSON<T extends unknown>(absolutePath: string): Promise<T> {
		const filePath = path.join(process.cwd(), absolutePath)
		const fileContent = await fs.readFile(filePath, 'utf8')
		return JSON.parse(fileContent) as T
	}
}
