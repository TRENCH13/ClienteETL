import { createRoot } from 'react-dom/client'
import './index.css'
import LoginScreen from "./screens/Login/LoginScreen.tsx";
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <LoginScreen />
  </ThemeProvider>,
)
