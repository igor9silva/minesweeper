
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';

import MineSweeper from './components/MineSweeper';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <MineSweeper height={10} width={10} mines={20} />,
  document.getElementById('root')!
);

registerServiceWorker();
