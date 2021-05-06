import type { NextApiRequest, NextApiResponse } from 'next'
import { File } from 'src/utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {

	if (req.method === 'GET') {
		try {
			const json = await File.read('src/pages/api/json/json.json')
			return res.status(200).json(json)
		}
		catch (e) {
			return res.status(500).json(e)
		}
	}

	if (req.method === 'POST') {
		const json = req.body

		try {
			await File.write('src/pages/api/json/json.json', json)
			return res.status(200).json(json)
		}
		catch (e) {
			return res.status(500).json(e)
		}
	}
}
