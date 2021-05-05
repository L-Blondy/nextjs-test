import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { Sheet } from 'src/components/excel'

export default function Home() {


	return (
		<div className={'h-full'}>
			<Head>
				<title>Portfolio</title>
				<meta name="description" content="Laurent Blondy portfolio" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='h-full'>
				<Sheet />
			</main>
		</div >
	)
}
