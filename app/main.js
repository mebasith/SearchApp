// This file sets up React. You shouldn't need to edit it.
// (But if you really want to, no one's gonna stop you. ¯\_(ツ)_/¯)

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './components/Routes';

render(
    <Routes />,
  document.getElementById('main')
);
