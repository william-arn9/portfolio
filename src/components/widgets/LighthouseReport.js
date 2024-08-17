import React from 'react';
import ScoreCard from './ScoreCard';
import './LighthouseReport.scss';

const LighthouseReport = ({ data, end, error }) => {
  return (
    <div className="backdrop">
      <div className="lighthouse-report">
        <div className="modal-header">
          <button type="button" aria-label="Close modal" onClick={() => {end()}}>×</button>
        </div>
        <div className="content">
          {data && (
            <>
              {data?.categories?.performance && (<ScoreCard title="Performance" score={data?.categories?.performance?.score * 100} data={data.audits} />)}
              {data?.categories?.accessibility && (<ScoreCard title="Accessibility" score={data?.categories?.accessibility?.score * 100} data={data.audits} />)}
              {data?.categories?.['best-practices'] && (<ScoreCard title="Best Practices" score={data?.categories?.['best-practices']?.score * 100} data={data.audits} />)}
              {data?.categories?.seo && (<ScoreCard title="SEO" score={data?.categories?.seo?.score * 100} data={data.audits} />)}
            </>
          )}
          {!data && !error && (
            <div className="loader-wrapper">
              <div className="loader"></div>
              <p className="loader-text">Running the audit server-side..</p>
            </div>
          )}
          {!data && error && (
            <p className="error-text">{ error }</p>
          )}
          <p>Powered by Lighthouse</p>
        </div>
      </div>
    </div>
  );
};

export default LighthouseReport;
