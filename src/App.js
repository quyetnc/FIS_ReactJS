import React from 'react';
import './App.css';
import RouteClient from './RouteClient'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CookiesProvider } from 'react-cookie'

function App() {
  return (
    <CookiesProvider>
      <div className="App">
        <RouteClient />
      </div>
    </CookiesProvider>
  );
}

export default App;
