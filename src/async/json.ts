import axios from 'axios';
import useSWR, { SWRConfiguration } from 'swr';

interface Data {
	data: string
}

const fetchJson = (url: string) => (
	axios
		.get(url)
		.then(res => res.data as Data)
)

export const useFetchJson = (config?: SWRConfiguration<Data, Error, typeof fetchJson>) => (
	useSWR('/api/json', fetchJson, config)
)

export const postJson = (json: { data: string }) => (
	axios
		.post('/api/json', json)
		.then(res => res.data)
)
