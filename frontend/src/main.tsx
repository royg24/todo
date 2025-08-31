import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ColorProvider from "@/ColorProvider.tsx";
import {TasksProvider} from "@/TaskProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ColorProvider>
          <TasksProvider>
            <App />
          </TasksProvider>
      </ColorProvider>
  </StrictMode>,
)
