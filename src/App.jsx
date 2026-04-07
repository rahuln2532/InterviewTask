
import './App.css'
import { Router } from './router'
import ProductProvider from './context/productProvider'
import AuthProvider from './context/auth/authProvider'
import { KycLogin } from './kyc/login'
import SimpleDrawer from './layout/header'
import { SnackbarProvider } from 'notistack';

function App() {

  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <AuthProvider>
          <ProductProvider>
            <Router />
          </ProductProvider>
        </AuthProvider>
      </SnackbarProvider>


    </>
  )
}

export default App
