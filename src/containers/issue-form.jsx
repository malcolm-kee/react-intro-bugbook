import React from 'react';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { CardActions, CardContents, CardTitle } from '../components/card';
import * as services from '../services/bug-services';

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

export default IssueForm;
