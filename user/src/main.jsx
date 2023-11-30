import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'
import theme from './theme.jsx'
import { AuthProvider } from './context/auth.context.jsx';
import { CartProvider } from './context/cart.context.jsx';
import { CheckOutProvider } from './context/checkout.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
      <AuthProvider>
        <CheckOutProvider>
          <ChakraProvider theme={extendTheme(theme)}>
              <App />
          </ChakraProvider>
        </CheckOutProvider>
      </AuthProvider>
    </CartProvider>
)
  