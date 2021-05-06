import Head from 'next/head'
import { FormEvent, useState } from 'react'
import { useFetchJson, postJson } from 'src/async/json'

export default function Home() {

	const { data: json, error, mutate } = useFetchJson()

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const elements = Array.from(e.currentTarget.elements)
		elements.filter(el => el.tagName === 'INPUT').forEach((el: any) => {
			if (el.value === json?.data) return
			mutate({ data: el.value }, false)
			postJson({ data: el.value })
				.catch(console.log)
		})
	}

	return (
		<div className={'h-full'}>
			<Head>
				<title>Next.js Test</title>
				<meta name="description" content="Laurent Blondy portfolio" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className='h-full p-5'>
				{JSON.stringify(json)}

				<form onSubmit={handleSubmit} className='mt-3'>
					<input
						type='text'
						className='rounded border border-gray-500 leading-7 px-1.5'
					/>
					<button
						type='submit'
						className='px-4 py-1 rounded bg-indigo-300 text-indigo-800'>
						Submit
					</button>
				</form>
			</main>
		</div >
	)
}
