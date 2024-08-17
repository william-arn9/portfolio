import React, { useEffect } from 'react';
import './ScoreCard.scss';

const ScoreCard = ({ title, score, data }) => {
  useEffect(() => {
    return (() => {

    })
  }, []);

  return (
    <div className="score-card">
      <h3>{title}</h3>
      <div className={`score ${score > 80 ? 'green' : score > 50 ? 'yellow' : 'red'}`}>
        {score}%
      </div>
      <h4>Audit points:</h4>
      <table class="audit-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th className="status-col">Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).filter((key) => data[key].scoreDisplayMode !== "notApplicable").map((key) => (
            <>
              <tr key={data[key].id}>
                <td>{data[key].title}</td>
                <td>{data[key].description}</td>
                <td className='status-col'>
                  <span
                    className={`status ${
                      data[key].score === 1
                        ? 'pass'
                        : data[key].score === 0
                        ? 'fail'
                        : 'not-applicable'
                    }`}
                  >
                    {data[key].score === 1
                      ? 'Pass'
                      : data[key].score === 0
                      ? 'Fail'
                      : data[key].scoreDisplayMode === 'numeric'
                      ? data[key].score
                      : data[key].scoreDisplayMode}
                  </span>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;