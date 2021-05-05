import React from 'react';
import { pure } from 'src/hoc';


export const COL_HEADER_CN = 'col-header'


interface Props {
	col: number
}

const ColHeader = ({
	col,
}: Props) => {



	return (
		<div data-num={col} className={`${COL_HEADER_CN} w-28 bg-gray-300`}>
			COL {col}
		</div>
	)
}

export default pure(ColHeader);