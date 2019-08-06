import React from 'react';
import ReactDOM from 'react-dom';
// import { HomePage } from './pages/homepage';
import { IssuePage } from './pages/issuepage';
import './style.scss';

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
    return this.state.hasError ? <p>Something goes wrong</p> : <IssuePage />;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
