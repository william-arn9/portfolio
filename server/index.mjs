import express from 'express';
import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import compression from 'compression';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

globalThis.fetch = fetch;

const app = express();

app.use(compression());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.PUPPETEER_CACHE_DIR = process.env.PUPPETEER_CACHE_DIR || path.join(__dirname, '.cache', 'puppeteer');// Serve static files with Brotli compression

app.get('*.js', (req, res, next) => {
  const brotliPath = path.join(__dirname, '../build', `${req.url}.br`);
  if (fs.existsSync(brotliPath)) {
    res.setHeader('Content-Encoding', 'br');
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(brotliPath);
  } else {
    next();
  }
});
app.get('*.css', (req, res, next) => {
  const brotliPath = path.join(__dirname, '../build', `${req.url}.br`);
  if (fs.existsSync(brotliPath)) {
    res.setHeader('Content-Encoding', 'br');
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(brotliPath);
  } else {
    next();
  }
});
app.get('*.html', (req, res, next) => {
  const brotliPath = path.join(__dirname, '../build', `${req.url}.br`);
  if (fs.existsSync(brotliPath)) {
    res.setHeader('Content-Encoding', 'br');
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(brotliPath);
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/lighthouse', async (req, res) => {
  const { category } = req.query;
  
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });

    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const headers = request.headers();
      headers['Accept-Encoding'] = 'gzip, deflate, br'; // Ensure Brotli (br) compression is supported
      request.continue({ headers });
    });
    await page.goto(`https://0.0.0.0:${PORT}`);  // Replace with your local or deployed URL as appropriate

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
