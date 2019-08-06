import axios from 'axios';
import React from 'react';

function BugItem(props) {
  return (
    <article onClick={props.onClick} className="card bug-item">
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

function TextInput(props) {
  return (
    <div className="form-control">
      <label htmlFor={props.id}>{props.label}</label>
      <input
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
      axios
        .get(`https://bugbook-server.herokuapp.com/bugs/${props.selectedId}`)
        .then(res => {
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
      axios
        .put(`https://bugbook-server.herokuapp.com/bugs/${props.selectedId}`, {
          reportedBy,
          title,
          status,
        })
        .then(res => {
          clear();
          props.onSubmitSuccess();
        });
    } else {
      axios
        .post(`https://bugbook-server.herokuapp.com/bugs`, {
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
        <div className="card-title">{props.selectedId ? 'Edit' : 'Create'}</div>
        <div className="card-content">
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
        </div>
        <div className="card-actions">
          <button type="submit" className="btn">
            {props.selectedId ? 'Save' : 'Create'}
          </button>
          <button onClick={clear} type="reset" className="btn btn-white">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export const IssuePage = () => {
  const [issues, setIssues] = React.useState([]);
  const [status, setStatus] = React.useState('loading');
  const [issueId, setIssueId] = React.useState(null);

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
    </div>
  );
};
