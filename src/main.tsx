import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

import './index.css'

declare global {
  interface Window {
    RSSParser: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
