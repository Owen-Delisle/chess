// await Bun.build({
// 	entrypoints: ['./src/index.ts'],
// 	outdir: './public',
// });

// await Bun.build({
// 	entrypoints: ['./src/components/board/board.ts'],
// 	outdir: './public'
// })

// await Bun.build({
// 	entrypoints: ['./src/server/scripts/open_ws_connection.ts'],
// 	outdir: './public'
// })

await Bun.build({
	entrypoints: [
		'./src/components/board/board.ts', 
		'./src/startup_scripts/login.ts',
		'./src/startup_scripts/client_connection.ts'
	],
	outdir: './public',
	splitting: true,
  })