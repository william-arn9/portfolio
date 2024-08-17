import express from 'express';
import puppeteer from 'puppeteer';
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
  
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto(`http://0.0.0.0:${PORT}`);  // Replace with your local or deployed URL as appropriate

    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: [category],  // Ensure this is a valid category
      port: new URL(browser.wsEndpoint()).port,
    };

    const runnerResult = await lighthouse(page.url(), options);

    await browser.close();

    res.json(runnerResult.lhr);
  } catch (error) {
    console.error('Error running Lighthouse:', error);
    res.status(500).json({ error: 'Failed to run Lighthouse audit' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
