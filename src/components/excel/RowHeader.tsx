import React from 'react';
import { pure } from 'src/hoc';


export const ROW_HEADER_CN = 'row-header'


interface Props {
	row: number
}

const RowHeader = ({
	row,
}: Props) => {



	return (
		<div data-num={row} className={`${ROW_HEADER_CN} bg-gray-300`}>
			ROW {row}
		</div>
	)
}

export default pure(RowHeader);