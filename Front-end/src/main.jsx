import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'aos/dist/aos.css';
import { DataLayer } from './context/Datalayer.jsx';
import reducer, { initialState } from './utils/reducer.js';
// import { lazy, Suspense } from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataLayer initialstate={initialState} reducer={reducer} >

    <App />
    </DataLayer>
  </React.StrictMode>
)
