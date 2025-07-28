import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Button } from '@repo/ui'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
    <Button/>
  </StrictMode>,
)
