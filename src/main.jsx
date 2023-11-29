import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Provider from './lib/provider.jsx';
import RoutesConfig from './RoutesConfig.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <RoutesConfig />
    </Provider>
  </React.StrictMode>
);
