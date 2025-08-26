import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppProvider from "@/AppProvider.tsx";
import {TasksProvider} from "@/contexts/TasksContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppProvider>
          <TasksProvider>
            <App />
          </TasksProvider>
      </AppProvider>
  </StrictMode>,
)
