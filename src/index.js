import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./i18n";
// function App() {
//   const { t } = useTranslation();

//   return <h2>{t('welcome_to_react')}</h2>;
// }


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
