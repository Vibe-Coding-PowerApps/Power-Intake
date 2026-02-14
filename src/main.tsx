import { StrictMode } from 'react'
console.log('[main.tsx] Script loaded');
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import './index.css'
import './styles/globals.css'
import App from './App.tsx'
import ErrorBoundary from './ErrorBoundary'
import { ActiveThemeProvider } from '@/components/active-theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ActiveThemeProvider>
          <App />
        </ActiveThemeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
