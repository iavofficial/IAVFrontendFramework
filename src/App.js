// TODO: Problem mit Content: Kein React.cloneElement(...) möglich. Normaler Methodenaufruf notwendig.
import { Component } from 'react';
import './App.css';
import 'primeflex/primeflex.css';
import Contentmanager from './components/contentmanager';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Contentmanager></Contentmanager>
    );
  }
}

export default App;