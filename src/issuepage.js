import axios from 'axios';
import React from 'react';

function BugItem(props) {
  return (
    <article className="card bug-item">
      <div className="card-title">{props.status}</div>
      <div className="card-content">
        <p>{props.title}</p>
        <i>Reported by {props.reportedBy}</i>
      </div>
    </article>
  );
}

function Spinner() {
  return <div className="spinner" />;
}

export const IssuePage = () => {
  const [issues, setIssues] = React.useState([]);
  const [status, setStatus] = React.useState('loading');

  function loadIssues() {
    axios
      .get(`https://bugbook-server.herokuapp.com/bugs`)
      .then(res => {
        setIssues(res.data);
        setStatus('idle');
      })
      .catch(err => setStatus('error'));
  }

  React.useEffect(() => {
    loadIssues();
  }, []);

  return (
    <div>
      {status === 'loading' && <Spinner />}
      {status === 'error' && (
        <span>
          Sorry, something goes wrong<button onClick={loadIssues}>Retry</button>
        </span>
      )}
      {issues.map(issue => (
        <BugItem
          title={issue.title}
          status={issue.status}
          reportedBy={issue.reportedBy}
          key={issue.id}
        />
      ))}
    </div>
  );
};
