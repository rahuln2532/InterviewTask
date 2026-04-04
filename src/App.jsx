
import './App.css'
import { Router } from './router'
import ProductProvider from './context/productProvider'
import AuthProvider from './context/auth/authProvider'
import { KycLogin } from './kyc/login'

function App() {

  return (
    <>
    <AuthProvider>
      <ProductProvider>
        <Router />
      </ProductProvider>
      </AuthProvider>

      
    </>
  )
}

export default App
