
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';

import MineSweeper from './components/MineSweeper';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <MineSweeper height={16} width={17} mines={99} />,
  document.getElementById('root')!
);

registerServiceWorker();
