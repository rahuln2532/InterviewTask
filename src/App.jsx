
import './App.css'
import { Router } from './router'
import ProductProvider from './context/productProvider'

function App() {

  return (
    <>
      <ProductProvider>
        <Router />
      </ProductProvider>
    </>
  )
}

export default App
