import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { css } from '@emotion/css/macro';

const appStyl = css`
  overflow-x: hidden;
`

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App className={appStyl} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


