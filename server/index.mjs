import express from 'express';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

globalThis.fetch = fetch;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/lighthouse', async (req, res) => {
  const { category } = req.query;
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    port: chrome.port,
    onlyCategories: [category]
  };
  const runnerResult = await lighthouse('http://localhost:3000', options);

  await chrome.kill();

  res.json(runnerResult.lhr);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
