import React from 'react'
import './styles.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { TodoProvider } from './context/TodoContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>,
)
