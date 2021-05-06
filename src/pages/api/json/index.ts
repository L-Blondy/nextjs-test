import type { NextApiRequest, NextApiResponse } from 'next'
import { ReadFile } from 'src/utils/ReadFile'
import { WriteFile } from 'src/utils/WriteFile'

export default async (req: NextApiRequest, res: NextApiResponse) => {

	if (req.method === 'GET') {
		const json = await ReadFile.JSON('src/pages/api/json/json.json')

		return res.status(200).json(json)
	}

	if (req.method === 'POST') {
		const json = req.body
		try {
			await WriteFile.JSON('src/pages/api/json/json.json', json)
			return res.status(200).json(json)
		}
		catch (e) {
			return res.status(500)
		}
	}
}
