import React from 'react';
import ReactDOM from 'react-dom';
import SavePage from './SavePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SavePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});