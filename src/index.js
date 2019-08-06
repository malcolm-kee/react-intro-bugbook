import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/homepage';
import { IssuePage } from './pages/issuepage';
import './style.scss';

const IssueDetails = ({
  match: {
    params: { id },
  },
}) => {
  React.useEffect(() => {}, [id]);

  return <div>Issue Page {id}</div>;
};

function ProtectedRoute(props) {
  const isAuthenticated = true;

  return isAuthenticated ? <Route {...props} /> : <div>Login</div>;
}

const Fallback = () => <h1>404</h1>;

class App extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    return this.state.hasError ? (
      <p>Something goes wrong</p>
    ) : (
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path="/issues" exact component={IssuePage} />
          <Route path="/issues/:id/:wulala" component={IssueDetails} />
          <Route path="/" exact component={HomePage} />
          <Route component={Fallback} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
