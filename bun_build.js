await Bun.build({
    entrypoints: ['./src/index.ts', './src/components/board/board.ts'],
    outdir: './public',
    splitting: true
  });

//   await Bun.build({
//     entrypoints: ['./src/components/board/board.ts'],
//     outdir: './public'
//   })