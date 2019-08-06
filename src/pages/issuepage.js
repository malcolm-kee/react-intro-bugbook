import React from 'react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Card, CardActions, CardContents, CardTitle } from '../components/card';
import { Spinner } from '../components/spinner';
import { DataContainer } from '../components/data-container';
import * as services from '../services/bug-services';

function BugItem(props) {
  return (
    <Card onClick={props.onClick} title={props.status} className="bug-item">
      <p>{props.title}</p>
      <i>Reported by {props.reportedBy}</i>
    </Card>
  );
}

function TextInput(props) {
  return (
    <div className="form-control">
      <label htmlFor={props.id}>{props.label}</label>
      <Input
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      />
    </div>
  );
}

function SelectInput(props) {
  return (
    <div className="form-control">
      <label htmlFor={props.id}>{props.label}</label>
      <select
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      >
        {props.children}
      </select>
    </div>
  );
}

function IssueForm(props) {
  const [reportedBy, setReported] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [status, setStatus] = React.useState('');

  function clear() {
    setReported('');
    setTitle('');
    setStatus('');
  }

  React.useEffect(() => {
    if (props.selectedId) {
      services.getBug(props.selectedId).then(res => {
        setReported(res.data.reportedBy);
        setTitle(res.data.title);
        setStatus(res.data.status);
      });
    } else {
      clear();
    }
  }, [props.selectedId]);

  function submitForm() {
    if (props.selectedId) {
      services
        .updateBug({
          reportedBy,
          title,
          status,
          id: props.selectedId,
        })
        .then(res => {
          clear();
          props.onSubmitSuccess();
        });
    } else {
      services
        .createBug({
          reportedBy,
          title,
          status,
        })
        .then(res => {
          clear();
          props.onSubmitSuccess();
        });
    }
  }

  return (
    <div className="card">
      <form
        onSubmit={ev => {
          ev.preventDefault();
          submitForm();
        }}
      >
        <CardTitle>{props.selectedId ? 'Edit' : 'Create'}</CardTitle>
        <CardContents>
          <TextInput
            label="Your Name"
            value={reportedBy}
            onChange={ev => setReported(ev.target.value)}
            required
          />
          <TextInput
            label="Issue Title"
            value={title}
            onChange={ev => setTitle(ev.target.value)}
            required
          />
          <SelectInput
            label="Status"
            value={status}
            onChange={ev => setStatus(ev.target.value)}
            id="status"
            name="status"
            required
          >
            <option value="" />
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Clarification Required" disabled>
              Clarification Required
            </option>
            <option value="Rejected" disabled>
              Rejected
            </option>
          </SelectInput>
        </CardContents>
        <CardActions>
          <Button type="submit">{props.selectedId ? 'Save' : 'Create'}</Button>
          <Button color="white" onClick={clear} type="reset">
            Cancel
          </Button>
        </CardActions>
      </form>
    </div>
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
    <DataContainer status={status}>
      {issues.map(issue => (
        <BugItem
          onClick={() => setIssueId(issue.id)}
          title={issue.title}
          status={issue.status}
          reportedBy={issue.reportedBy}
          key={issue.id}
        />
      ))}
      <IssueForm
        selectedId={issueId}
        onSubmitSuccess={() => {
          loadIssues();
          setIssueId(null);
        }}
      />
    </DataContainer>
  );
};
