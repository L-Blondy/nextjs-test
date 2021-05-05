import { Dispatch, MutableRefObject, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import { createRange } from 'src/utils/createRange'
import { queryAll } from 'src/utils/dom/queryAll'
import { COL_HEADER_CN } from './ColHeader'
import { ROW_HEADER_CN } from './RowHeader'
import { VisibleCells } from './types'

export function useDynamicRows(minRowCount: number): number[] {

	const lastRowNumRef = useRef(minRowCount)
	const [ rows, setRows ] = useState(createRange(1, minRowCount))

	const config: Config = {
		items: rows,
		setItems: setRows,
		lastItemNumRef: lastRowNumRef,
		selector: `.${ROW_HEADER_CN}`,
		minItemsCount: minRowCount
	}

	useAdd(20, config)
	// useRemove(22, config)
	return rows
}

export function useDynamicCols(minColCount: number): number[] {

	const lastColNumRef = useRef(minColCount)
	const [ cols, setCols ] = useState(createRange(1, minColCount))

	const config: Config = {
		items: cols,
		setItems: setCols,
		lastItemNumRef: lastColNumRef,
		selector: `.${COL_HEADER_CN}`,
		minItemsCount: minColCount,
	}
	useAdd(20, config)
	// useRemove(22, config)
	return cols
}


interface Config {
	items: number[]
	setItems: Dispatch<SetStateAction<number[]>>
	lastItemNumRef: MutableRefObject<number>
	selector: string
	minItemsCount: number
}

function useAdd(countToAdd: number, { items, setItems, lastItemNumRef, selector }: Config) {
	useEffect(() => {
		const observedEl: HTMLElement = queryAll(selector as keyof HTMLElementTagNameMap).slice(-1)[ 0 ] as any
		if (!observedEl) return

		lastItemNumRef.current = parseInt(observedEl.dataset.num || '1')
		const observer = new IntersectionObserver(listener, {})

		function listener([ e ]: IntersectionObserverEntry[]) {
			if (!e.isIntersecting) return
			lastItemNumRef.current = lastItemNumRef.current + countToAdd
			setItems(createRange(1, lastItemNumRef.current))
		}

		observer.observe(observedEl)

		return () => observer.unobserve(observedEl)
	}, [ items ])
}

// function useRemove(countToRemove: number, { items, setItems, lastItemNumRef, selector, minItemsCount }: Config) {

// 	useEffect(() => {
// 		const observedEl: HTMLElement = Array.from(document.querySelectorAll(selector)).slice(-1 - 2 * countToRemove)[ 0 ] as any
// 		if (!observedEl) return

// 		const observer = new IntersectionObserver(listener, {})

// 		function listener([ e ]: IntersectionObserverEntry[]) {
// 			const isLeftOrTop = e.boundingClientRect.bottom < 0 || e.boundingClientRect.right < 0
// 			const isMinTriggered = minItemsCount > lastItemNumRef.current - countToRemove

// 			if (e.isIntersecting || isLeftOrTop || isMinTriggered) return

// 			lastItemNumRef.current -= countToRemove
// 			setItems(createRange(1, lastItemNumRef.current))
// 		}

// 		observer.observe(observedEl)

// 		return () => observer.unobserve(observedEl)
// 	}, [ items ])
// }


interface UseVisibleCellsConfig {
	cols: number[]
	colsSelector: string
	rows: number[]
	rowsSelector: string
	onChange: ({ rows, cols }: VisibleCells) => void
}

export function useVisibleCells({
	cols,
	colsSelector,
	rows,
	rowsSelector,
	onChange,
}: UseVisibleCellsConfig) {

	const visibleItemsRef = useRef<VisibleCells>({ rows: new Set, cols: new Set })

	useObserveElements({
		items: rows,
		selector: rowsSelector as keyof HTMLElementTagNameMap,
		onChange: onRowsChange
	})

	useObserveElements({
		items: cols,
		selector: colsSelector as keyof HTMLElementTagNameMap,
		onChange: onColsChange
	})

	function onRowsChange(visibleRows: Set<number>) {
		visibleItemsRef.current.rows = visibleRows
		onChange({ ...visibleItemsRef.current })
	}

	function onColsChange(visibleCols: Set<number>) {
		visibleItemsRef.current.cols = visibleCols
		onChange({ ...visibleItemsRef.current })
	}
}

interface UseObserveElementsConfig {
	items: number[]
	selector: keyof HTMLElementTagNameMap
	onChange: (visibleItems: Set<number>) => void
}

function useObserveElements({
	items,
	selector,
	onChange
}: UseObserveElementsConfig) {

	const visibleItemsRef = useRef(new Set<number>())

	useEffect(() => {
		const elements = queryAll(selector)

		const observer = new IntersectionObserver(listener, {})

		function listener(entries: IntersectionObserverEntry[]) {
			entries.forEach(e => {
				const itemsNum = Number((e.target as any).dataset.num)
				if (!itemsNum || isNaN(itemsNum)) throw new Error('Invalid col/row number, check the "dataset-num" attribute')

				!e.isIntersecting
					? visibleItemsRef.current.delete(itemsNum)
					: visibleItemsRef.current.add(itemsNum)

				onChange(new Set(visibleItemsRef.current))
			})
		}
		elements.forEach(el => observer.observe(el))

		return () => elements.forEach(el => observer.unobserve(el))
	}, [ items ])
}

// function removeIsolatedEntries(set: Set<number>) {
// 	// if (set.size === 1) return new Set(set)

// 	// const newSet = new Set<number>()

// 	set.forEach(n => {
// 		if (set.has(n + 1) || set.has(n - 1)) { }
// 		else
// 			console.log('FOUND ISOLATED', n, new Set(set))
// 	})
// 	// return newSet
// }