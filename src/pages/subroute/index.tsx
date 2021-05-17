import { useFetchJson } from 'src/async/json'


interface Props {

}

export default function SubRoute({
	...props
}: Props) {

	const { data: json, error, mutate } = useFetchJson()

	return (
		<div>SubRoute</div>
	)
}