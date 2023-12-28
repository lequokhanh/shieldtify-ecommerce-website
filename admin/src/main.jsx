import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'
import theme from './theme.jsx'
import { AuthProvider } from './context/auth.context.jsx';
import { ProductsProvider } from './context/products.context.jsx';
import { UsersProvider } from './context/users.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <UsersProvider>
      <AuthProvider>  
        <ProductsProvider>
          <ChakraProvider theme={extendTheme(theme)}>
            <App />
          </ChakraProvider>
        </ProductsProvider>
      </AuthProvider>
    </UsersProvider>
)
  