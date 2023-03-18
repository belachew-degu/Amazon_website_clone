import React from 'react';
import ReactDOM from 'react-dom/client';
import {store,persistor} from './redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import firebaseConfig  from './firebase.config';
import "slick-carousel/slick/slick.css"; 
import './index.css';
import App from './App';
// import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <PersistGate loading={"loading"} persistor = {persistor}>
        <App />
      </PersistGate>
</Provider>,
    

    
);

