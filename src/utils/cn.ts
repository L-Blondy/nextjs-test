export const cn = (template: TemplateStringsArray, ...args: (string | boolean | undefined | number | null)[]) => {
	let res = ''

	for (let i = 0; i < template.length; i++) {
		res += `${template[ i ]}${args[ i ] || ''} `
	}
	return res.replace(/(\r\n|\n|\r|\s+)/gm, " ").trim()
}
