import logo from './logo.svg';
import './App.css';
import 'rsuite/lib/styles/index.less';

import { Header } from "./components/Header";
import Routing from './Routing';

function App() {
  return (
    <div className="App">
      {/* <Header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </Header> */}
      <Routing />
    </div>
  );
}

export default App;
