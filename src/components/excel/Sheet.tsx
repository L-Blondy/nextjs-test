import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useStateDebounced } from 'src/hooks';
import Cell from './Cell';
import ColHeader, { COL_HEADER_CN } from './ColHeader';
import RowHeader, { ROW_HEADER_CN } from './RowHeader';
import { VisibleCells } from './types';
import { useDynamicRows, useDynamicCols, useVisibleCells } from './utils';

const minRowCount = 100
const minColCount = 200

interface Props {

}

const Sheet = ({
	...props
}: Props) => {

	const [ visibleCells, setVisibleCells ] = useStateDebounced<VisibleCells | null>(null, 100)
	const rows = useDynamicRows(minRowCount)
	const cols = useDynamicCols(minColCount)

	useVisibleCells({
		rows,
		rowsSelector: `.${ROW_HEADER_CN}`,
		cols,
		colsSelector: `.${COL_HEADER_CN}`,
		onChange(visibleCells) {
			setVisibleCells(visibleCells)
		}
	})

	useEffect(() => console.log(visibleCells), [ visibleCells ])

	return (
		<div className='h-full grid' style={{ gridTemplateColumns: `repeat(${cols.length + 1} , auto)`, gridAutoRows: 'minmax(20px, auto)' }}>
			<div className='w-28 bg-gray-200'>Top-left</div>

			{cols.map(col => (
				<ColHeader col={col} key={`col-${col}`} />
			))}

			{rows.map(row => (
				<Fragment key={`row-${row}`}>
					<RowHeader row={row} />

					{cols.map(col => visibleCells?.rows.has(row) && visibleCells?.cols.has(col)
						? <Cell row={row} col={col} key={`cell-${row}/${col}`} />
						: <div key={`placeholder-${row}/${col}`} />
					)}
				</Fragment>
			))}
		</div>
	)
}

export default Sheet;