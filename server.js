import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT    = process.env.PORT    || 3000;
const NODE_ID = process.env.NODE_ID || 'latam';

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1h',
  etag: true,
}));

// SPA fallback — serve index.html for any unmatched route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Veterinario Alfa Latinoamérica [node:${NODE_ID}] → http://localhost:${PORT}`);
});
