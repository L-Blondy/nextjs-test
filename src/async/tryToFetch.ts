import axios from 'axios';

export const tryToFetch = () => (
	axios
		.get('/api/test/nested/eventMoreNested')
		.then(res => res.data)
)