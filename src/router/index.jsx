import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardComponent from "../product/productCard";
import CheckoutPage from "../product/checkoutPage";
import { KycRegistration } from "../kyc/kycRegistration";

export function Router(){
  
    return(
      <BrowserRouter>
      <Routes>
        <Route path="/" element={< CardComponent/>}/>

        <Route path="/checkOut" element={< CheckoutPage/>}/>

        <Route path="/kyc" element={< KycRegistration/>}/>
        
      </Routes>
      </BrowserRouter>
    )

}