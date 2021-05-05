import React from 'react';
import { pure } from 'src/hoc';

interface Props {
	row: number
	col: number
}

const Cell = ({
	row,
	col,
}: Props) => {



	return (
		<div className='w-28'>
			CELL {row}/{col}
		</div>
	)
}

export default pure(Cell);