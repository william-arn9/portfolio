import React, { useState } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import ReactJson from 'react-json-view';
import JSONPretty from 'react-json-pretty';
import './JsonViewer.scss';

function JsonViewer() {
  const [inputJson, setInputJson] = useState('');
  const [jsonObject, setJsonObject] = useState(null);
  const [errorObject, setErrorObject] = useState(null);
  const [outputType, setOutputType] = useState('js');

  const prettyStyle = {
    main: 'line-height:1.3;color:#66d9ef;background:#ffffff20;overflow:auto;width:100%;height:100%;border-radius:6px;padding:12px;margin:0;box-sizing:border-box;',
    error: 'line-height:1.3;color:#66d9ef;background:#272822;overflow:auto;',
    key: 'color:#66d9ef;',
    string: 'color:#e07431;',
    value: 'color:#a6e22e;',
    boolean: 'color:#ac81fe;',
  };

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

  const handleOutputTypeChange = (e) => {
    const { value } = e.target;
    setOutputType(value);
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
          <div>
            Output:
            <div className="radio-group">
              <label className={`radio-label ${outputType === 'json' ? 'checked' : ''}`}>
                <input
                  type="radio"
                  name="outputType"
                  value="json"
                  className="radio-button"
                  checked={outputType === 'json'}
                  onChange={handleOutputTypeChange}
                ></input>
                JSON
              </label>
              <label className={`radio-label ${outputType === 'js' ? 'checked' : ''}`}>
                <input
                  type="radio"
                  name="outputType"
                  value="js"
                  className="radio-button"
                  checked={outputType === 'js'}
                  onChange={handleOutputTypeChange}
                ></input>
                JS
              </label>
              <label className={`radio-label ${outputType === 'viewer' ? 'checked' : ''}`}>
                <input
                  type="radio"
                  name="outputType"
                  value="viewer"
                  className="radio-button"
                  checked={outputType === 'viewer'}
                  onChange={handleOutputTypeChange}
                ></input>
                Viewer
              </label>
            </div>
          </div>
          <div className="button-group">
            <button type="button" onClick={() => {setInputJson('');setErrorObject(null);setJsonObject(null)}}>Clear</button>
            <button type="button" onClick={handleFormat}>View Formatted</button>
          </div>
        </div>
        <div className="read pane">
          {outputType === 'js' && (
            <JSONInput
              id='results'
              placeholder={jsonObject ?? [ ]}
              locale={ locale }
              height='80vh'
              reset
              error={errorObject}
              style={{
                body: {height: '100%', padding: '12px 4px', "text-align": "left", "border-radius": "8px", "font-size": '12px'},
                container: {width: '100%', height: '100%', "border-radius": "8px"},
                outerBox: {width: '100%', height: '100%'},
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
          )}
          {outputType === 'viewer' && (
            <ReactJson
              theme="ashes"
              src={jsonObject ?? [ ]}
              style={{width: '100%', backgroundColor: '#ffffff20', padding: '12px', borderRadius: '6px'}}
              displayDataTypes={false}
              validationMessage={errorObject?.reason ?? ''}
            />
          )}
          {outputType === 'json' && (
            <JSONPretty id="json-pretty" data={jsonObject ?? [ ]} theme={prettyStyle}></JSONPretty>
          )}
        </div>
      </section>
    </div>
  );
}

export default JsonViewer;