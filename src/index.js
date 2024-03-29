import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store/store';
import App from './App';
// import './index.css';
import './polyfills';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor} /> */}
        <App />
    </Provider>,  
  document.getElementById('root')
);
 // <React.StrictMode>s
 {/* </React.StrictMode>, */}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
