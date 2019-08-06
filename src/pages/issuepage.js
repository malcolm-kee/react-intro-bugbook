import React from 'react';
import { Link } from 'react-router-dom';
import { DataContainer } from '../components/data-container';
import { Card } from '../components/card';
import * as services from '../services/bug-services';
import { Spinner } from '../components/spinner';

const IssueForm = React.lazy(() => import('../containers/issue-form'));

function BugItem(props) {
  return (
    <Card onClick={props.onClick} title={props.status} className="bug-item">
      <p>{props.title}</p>
      <i>Reported by {props.reportedBy}</i>
    </Card>
  );
}

export const IssuePage = () => {
  const [issues, setIssues] = React.useState([]);
  const [status, setStatus] = React.useState('loading');
  const [issueId, setIssueId] = React.useState(null);

  function loadIssues() {
    services
      .getBugs()
      .then(res => {
        setIssues(res.data);
        setStatus('idle');
      })
      .catch(err => setStatus('error'));
  }

  React.useEffect(loadIssues, []);

  return (
    <React.Suspense fallback={<Spinner />}>
      <DataContainer status="idle">
        <Link to="/">Home</Link>
        <IssueForm
          selectedId={issueId}
          onSubmitSuccess={() => {
            loadIssues();
            setIssueId(null);
          }}
        />
        {/* {issues.map(issue => (
        <BugItem
          onClick={() => setIssueId(issue.id)}
          title={issue.title}
          status={issue.status}
          reportedBy={issue.reportedBy}
          key={issue.id}
        />
      ))} */}
      </DataContainer>
    </React.Suspense>
  );
};
