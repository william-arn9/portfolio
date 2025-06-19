import { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import './MarkdownPreview.scss';

const SAMPLE_MARKDOWN = `# Welcome to the Markdown Previewer!

## Features
- **Bold text**
- *Italic text*
- [Links](https://www.example.com)
- Inline code: \`const x = 10;\`
- Code block:

\`\`\`
function greet() {
  console.log('Hello, world!');
}
\`\`\`
- Blockquote:
> This is a quote.
- List:
  - Item 1
  - Item 2

---

Enjoy writing markdown!`;

function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
  const [htmlOutput, setHtmlOutput] = useState('');
  
  const handleRender = (text = markdown) => {
    const rawHtml = marked(text, { breaks: true });
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);
    setHtmlOutput(sanitizedHtml);
  };

  useEffect(() => {
    handleRender();
  }, []);

  return (
    <div>
      <h2>Markdown Previewer</h2>
      <section className="content">
        <div className="write pane">
          <textarea
            placeholder="Type Markdown here..."
            value={markdown}
            onChange={(e) => {
              const newValue = e.target.value;
              setMarkdown(newValue);
              handleRender(newValue);
            }}
          />
        </div>
        <div className="read pane">
          <div
            className="markdown-output"
            dangerouslySetInnerHTML={{ __html: htmlOutput }}
          />
        </div>
      </section>
    </div>
  );
}

export default MarkdownPreviewer;
