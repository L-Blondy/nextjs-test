import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
	console.log(process.env.MONGO_URL)

	res.status(200).json({ name: 'Even more nested Test success' })
}
