import { useState } from 'react';
import styled from 'styled-components';

import logo2 from './assets/images/logo.svg';

import './App.css';
import './assets/css/App.css';

import styles from './style.module.css';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <img src={'/logo.svg'} className="App-logo" alt="logo" />
        <img src={logo2} className="logo2" alt="logo2" />
        <p>Vite Example</p>
        <StyledText>This text is styled by styled-components</StyledText>
        <p className={styles.green}>This text is styled by CSS Modules</p>

        <p>
          <button
            data-testid="increase"
            type="button"
            onClick={() => setCount((count) => count + 1)}
          >
            count is: <div data-testid="count">{count}</div>
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

const StyledText = styled.p`
  color: red;
`;

export default App;
