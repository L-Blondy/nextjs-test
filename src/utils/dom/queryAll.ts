export function queryAll<K extends keyof HTMLElementTagNameMap>(selector: K): Array<HTMLElementTagNameMap[ K ]> {
	return Array.from(document.querySelectorAll(selector))
}