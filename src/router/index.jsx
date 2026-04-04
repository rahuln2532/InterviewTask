import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardComponent from "../product/productCard";
import CheckoutPage from "../product/checkoutPage";
import { KycRegistration } from "../kyc/kycRegistration";
import OrderDonePage from "../product/orderDone";
import { KycLogin } from "../kyc/login";
import KYCunderReview from "../kyc/kycProgress";

export function Router(){
  
    return(
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<KycLogin/>}/>
        <Route path="/productCard" element={< CardComponent/>}/>
        <Route path="/underReview" element={< KYCunderReview/>}/>

        <Route path="/checkOut" element={< CheckoutPage/>}/>

        <Route path="/kyc" element={< KycRegistration/>}/>

        <Route path="/orderDone" element={< OrderDonePage/>}/>
        
      </Routes>
      </BrowserRouter>
    )

}