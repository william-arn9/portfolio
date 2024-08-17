import React, { useState } from 'react';
import './JsonViewer.scss';

function JsonViewer() {
  const [inputJson, setInputJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');

  const handleFormat = () => {
    try {
      console.log(inputJson);
      const parsedJson = JSON.parse(inputJson);
      const prettyJson = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(prettyJson);
    } catch (error) {
      setFormattedJson('Invalid JSON');
    }
  };

  return (
    <div>
      <h2>JSON Viewer</h2>
      <section className="content">
        <div className="write pane">
          <textarea
            placeholder="<Paste here>"
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
          ></textarea>
        </div>
        <div className="action pane">
          <button type="button" onClick={() => {setInputJson('');setFormattedJson('')}}>Clear</button>
          <button type="button" onClick={handleFormat}>View Formatted</button>
        </div>
        <div className="read pane">
          <textarea
            placeholder="<Formatted JSON will appear here>"
            disabled
            value={formattedJson}
          ></textarea>
        </div>
      </section>
    </div>
  );
}

export default JsonViewer;