await Bun.build({
	entrypoints: [
		'./src/components/board/board.ts', 
		'./src/startup_scripts/login.ts',
		'./src/startup_scripts/signup.ts',
		'./src/startup_scripts/client_connection.ts',
		'./src/ui/scripts/game_page_ui_script.ts',
		'./src/tests/startup_script.ts'
	],
	outdir: './public',
	splitting: true,
  })