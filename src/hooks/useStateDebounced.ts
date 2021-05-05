import { useCallback, useEffect, useRef, useState } from 'react'

export const useStateDebounced = <T extends any>(
	initialValue: T,
	delay: number
): [ T, SetState<T> ] => {

	const tokenRef = useRef<NodeJS.Timeout>()
	const [ state, _setState ] = useState<T>(initialValue)
	const stateRef = useRef<T>(initialValue)

	const setState = useCallback<SetState<T>>((action) => {
		stateRef.current = typeof action === 'function' ? (action as FunctionalAction<T>)(stateRef.current) : action
		tokenRef.current && clearTimeout(tokenRef.current)
		tokenRef.current = setTimeout(() => _setState(stateRef.current), delay)
	}, [ delay ])

	return [ state, setState ]
}

type FunctionalAction<T> = (prevState: T) => T
export type SetState<T> = (action: T | FunctionalAction<T>) => void