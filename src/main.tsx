import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import { Toaster } from 'sonner'
import { Buffer } from 'buffer'
window.Buffer = Buffer

import { supabase } from './lib/supabase'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <SessionContextProvider supabaseClient={supabase}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
        
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </React.StrictMode>
  </SessionContextProvider>
)
