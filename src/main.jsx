import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* basename matches whatever --base Vite was built with (see
        .github/workflows/deploy.yml) — "/" on every host except a GitHub
        Pages *project* page, where it's "/repo-name/". No-op elsewhere. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
