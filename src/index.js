import React from 'react';
import ReactDOM from 'react-dom';
import { HomePage } from './homepage';
// import { IssuePage } from './issuepage';

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
    return this.state.hasError ? <p>Something goes wrong</p> : <HomePage />;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
