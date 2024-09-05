import express from 'express';
import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import compression from 'compression';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import emailjs from 'emailjs-com';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import validator from 'validator';
import dotenv from 'dotenv';

dotenv.config();

globalThis.fetch = fetch;

const app = express();

app.set('trust proxy', 1)

app.use(helmet());
app.use(express.json());
app.use(compression());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.PUPPETEER_CACHE_DIR = process.env.PUPPETEER_CACHE_DIR || path.join(__dirname, '.cache', 'puppeteer');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2, // Limit each IP to 2 requests per 15 minutes
  message: "Too many submissions, please try again later."
});

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
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: [category],
      port: new URL(browser.wsEndpoint()).port,
      throttling: {
        cpuSlowdownMultiplier: 1,
        rttMs: 40,
        throughputKbps: 10 * 1024,
        requestLatencyMs: 0,
        downloadThroughputKbps: 10 * 1024,
        uploadThroughputKbps: 5 * 1024,
      },
      emulatedFormFactor: 'desktop',
      disableStorageReset: false, 
    };

    const runnerResult = await lighthouse(page.url(), options);

    await browser.close();

    res.json(runnerResult.lhr);
  } catch (error) {
    console.error('Error running Lighthouse:', error);
    res.status(500).json({ error: 'Failed to run Lighthouse audit' });
  }
});

app.post('/send-email', contactLimiter, async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!validator.isEmail(email) || validator.isEmpty(name) || validator.isEmpty(subject) || validator.isEmpty(message)) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  const sanitizedEmail = validator.normalizeEmail(email);
  const sanitizedName = validator.escape(name);
  const sanitizedSubject = validator.escape(subject);
  const sanitizedMessage = validator.escape(message);

  const templateParams = {
    from_name: sanitizedName,
    from_email: sanitizedEmail,
    subject: sanitizedSubject,
    message: sanitizedMessage,
  };

  try {
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.EMAILJS_PUBLIC_KEY
    );

    console.log('SUCCESS!', response.status, response.text);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('FAILED...', error);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
