import React, { useState } from 'react';
import './AccessibilityTool.scss';

function AccessibilityTool() {
  const [htmlInput, setHtmlInput] = useState('');
  const [elements, setElements] = useState([]);
  const [accessibleHtml, setAccessibleHtml] = useState('');

  const handleHtmlInput = (e) => {
    setHtmlInput(e.target.value);
  };

  const parseHtml = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlInput, 'text/html');
    const elementsArray = Array.from(doc.body.children);
    setElements(elementsArray.map(el => ({
      tag: el.tagName.toLowerCase(),
      attributes: {},
      outerHTML: el.outerHTML,
      index: elementsArray.indexOf(el)
    })));
  };

  const handleAttributeChange = (index, attr, value) => {
    const newElements = [...elements];
    newElements[index].attributes[attr] = value;
    setElements(newElements);
  };

  const generateAccessibleHtml = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlInput, 'text/html');
    elements.forEach((el, index) => {
      const element = doc.body.children[index];
      Object.entries(el.attributes).forEach(([attr, value]) => {
        element.setAttribute(attr, value);
      });
    });
    setAccessibleHtml(doc.body.innerHTML);
  };

  const renderElementWithInputs = (el, index) => {
    switch (el.tag) {
      case 'img':
        return (
          <span key={index}>
            {el.outerHTML.slice(0, -2)}{' '}
            <input
              type="text"
              placeholder="Alt text"
              onChange={(e) => handleAttributeChange(index, 'alt', e.target.value)}
              className="inline-input"
            />{' '}
            {'/>'}
          </span>
        );
      case 'a':
        return (
          <span key={index}>
            {el.outerHTML.slice(0, -4)}{' '}
            <input
              type="text"
              placeholder="Aria label"
              onChange={(e) => handleAttributeChange(index, 'aria-label', e.target.value)}
              className="inline-input"
            />
            {'</a>'}
          </span>
        );
      case 'button':
        return (
          <span key={index}>
            {el.outerHTML.slice(0, -10)}{' '}
            <input
              type="text"
              placeholder="Role"
              onChange={(e) => handleAttributeChange(index, 'role', e.target.value)}
              className="inline-input"
            />
            {el.outerHTML.slice(-10)}
          </span>
        );
      default:
        return <span key={index} dangerouslySetInnerHTML={{ __html: el.outerHTML }} />;
    }
  };

  return (
    <div className="accessibility-tool">
      <h2>Accessibility Tool (beta)</h2>
      <textarea
        value={htmlInput}
        onChange={handleHtmlInput}
        placeholder="Paste your HTML here"
      ></textarea>
      <button onClick={parseHtml}>Check Accessibility</button>

      {elements.length > 0 && (
        <div className="accessibility-view">
          <h3>Edit HTML for Accessibility</h3>
          <div className="html-preview">
            {elements.map((el, index) => renderElementWithInputs(el, index))}
          </div>
          <button onClick={generateAccessibleHtml}>Generate Accessible HTML</button>
        </div>
      )}

      {accessibleHtml && (
        <div className="output">
          <h3>Accessible HTML</h3>
          <textarea value={accessibleHtml} readOnly></textarea>
        </div>
      )}
    </div>
  );
}

export default AccessibilityTool;
