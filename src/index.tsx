
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';

import MineSweeper from './components/MineSweeper';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <MineSweeper height={20} width={20} mines={5} />,
  document.getElementById('root')!
);

registerServiceWorker();
