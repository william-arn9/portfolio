import React, { useState } from 'react';
import './PalettePreview.scss';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PalettePreview({ palette }) {
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);

  const getColor = (label) => palette.find(p => p.label === label)?.color || '#ffffff';

  return (
    <div className="mockup-preview">
      <div className="mockup-header" style={{ backgroundColor: getColor('Shade 1'), boxShadow: `2px -5px 20px ${getColor('Shadow')}` }}>
        <h1 style={{ color: getColor('Text') }}>Header</h1>
      </div>
      <div className="mockup-main" style={{ backgroundColor: getColor('Background') }}>
        <div className="mockup-aside" style={{ backgroundColor: getColor('Shadow') }}>
          <p style={{ color: getColor('Text') }}>Sidebar</p>
        </div>
        <section className="mockup-section">
          <div className="mockup-alert" style={{ backgroundColor: getColor('Foreground'), borderColor: getColor('Accent 1'), boxShadow: `2px 0px 20px ${getColor('Shadow')}` }}>
            <b style={{ color: getColor('Text') }}>
              <span><FontAwesomeIcon icon={faCircleExclamation}  style={{ color: getColor('Accent 2') }}/></span>
              Lorem ipsum: Actio necessaria! Consulta tua statuta.
            </b>
          </div>
          <h2 style={{ color: getColor('Text') }}>Main Content</h2>
          <div className="mockup-panel" style={{ backgroundColor: getColor('Foreground'), boxShadow: `2px 0px 20px ${getColor('Shadow')}` }}>
            <p style={{ color: getColor('Text') }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="mockup-button-wrapper">
              <button
                className="mockup-cancel button"
                type="button"
                style={{
                  color: getColor('Text'),
                  borderColor: getColor(isCancelHovered ? 'Shade 2' : 'Shade 1')
                }}
                onMouseEnter={() => setIsCancelHovered(true)}
                onMouseLeave={() => setIsCancelHovered(false)}
              >Cancel</button>
              <button
                className="mockup-submit button"
                type="submit"
                style={{
                  color: getColor('Text'),
                  backgroundColor: getColor(isSubmitHovered ? 'Shade 2' : 'Shade 1')
                }}
                onMouseEnter={() => setIsSubmitHovered(true)}
                onMouseLeave={() => setIsSubmitHovered(false)}
              >Continue</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PalettePreview;
