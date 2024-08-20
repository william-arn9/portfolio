import React, { useState } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import './JsonViewer.scss';

function JsonViewer() {
  const [inputJson, setInputJson] = useState('');
  const [jsonObject, setJsonObject] = useState(null);
  const [errorObject, setErrorObject] = useState(null);

  const handleFormat = () => {
    try {
      console.log(inputJson);
      const parsedJson = JSON.parse(inputJson);
      console.log(parsedJson);
      setJsonObject(parsedJson);
      setErrorObject(null);
    } catch (error) {
      setJsonObject(null);
      setErrorObject({reason: error});
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
          <button type="button" onClick={() => {setInputJson('');setErrorObject(null);setJsonObject(null)}}>Clear</button>
          <button type="button" onClick={handleFormat}>View Formatted</button>
        </div>
        <div className="read pane">
          <JSONInput
            id='results'
            placeholder={jsonObject ?? [ ]}
            locale={ locale }
            height='80vh'
            reset
            error={errorObject}
            style={{
              body: {height: '100%', padding: '12px 4px', "text-align": "left", "border-radius": "8px"},
              container: {width: '100%', height: '100%', "border-radius": "8px"},
              outerBox: {width: '96%', height: '100%'},
              warningBox: {height: '0px', 'text-align': 'left', margin: '0 0 0 30px'}
            }}
            colors={{
              default            : '#D4D4D4',
              background         : '#ffffff20',
              background_warning : '#1E1E1E',
              string             : '#CE8453',
              number             : '#B5CE9F',
              colon              : '#7FFFD4',
              keys               : '#7FFFD4',
              keys_whiteSpace    : '#AF74A5',
              primitive          : '#6392C6'
            }}
            viewOnly
          />
        </div>
      </section>
    </div>
  );
}

export default JsonViewer;