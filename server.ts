// server.ts
import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
console.log(__dirname)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
