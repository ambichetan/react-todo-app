import React from 'react'
import './styles.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { TodoProvider } from './context/TodoContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
