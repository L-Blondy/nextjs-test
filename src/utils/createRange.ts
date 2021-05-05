export function createRange(start: number, end: number): number[] {
	if (end < start)
		throw new Error('[createRange] end has to be >= start')
	return new Array(end - start + 1).fill(0).map((_, i) => i + 1)
}