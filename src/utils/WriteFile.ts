import { promises as fs } from 'fs'
import path from 'path'

export class WriteFile {

	static async JSON(absolutePath: string, data: string | Uint8Array | object) {
		const filePath = path.join(process.cwd(), absolutePath)

		if (typeof data === 'object') {
			data = JSON.stringify(data)
		}
		try {
			await fs.writeFile(filePath, data)
		}
		catch (e) {
			console.log(e)
		}
	}
}
