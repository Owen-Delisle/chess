await Bun.build({
	entrypoints: ['./src/index.ts'],
	outdir: './public',
});

await Bun.build({
	entrypoints: ['./src/components/board/board.ts'],
	outdir: './public'
})

await Bun.build({
	entrypoints: ['./src/components/dom/observer_el.ts'],
	outdir: './public'
})