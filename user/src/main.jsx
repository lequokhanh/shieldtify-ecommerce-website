import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import React from "react";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'
import theme from './theme.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={extendTheme(theme)}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
