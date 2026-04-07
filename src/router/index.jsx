import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardComponent from "../product/productCard";
import CheckoutPage from "../product/checkoutPage";
import { KycRegistration } from "../kyc/kycRegistration";
import OrderDonePage from "../product/orderDone";
import { KycLogin } from "../kyc/login";
import KYCunderReview from "../kyc/kycProgress";
import OrderHistoryPage from "../product/orderHistory";
import AuthGuard from "./authGuard";
import SimpleDrawer from "../layout/header";

export function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<KycLogin />} />

        <Route path="/productCard" element={
          <SimpleDrawer>
            < CardComponent />
          </SimpleDrawer>} />

        <Route path="/underReview" element={
          <SimpleDrawer>
          < KYCunderReview />
          </SimpleDrawer>
        } />

        <Route path="/checkout" element={
          <SimpleDrawer>
            <CheckoutPage />
          </SimpleDrawer>} />

        <Route path="/kyc" element={< KycRegistration />} />

        <Route path="/orderDone" element={
          <AuthGuard>
            <SimpleDrawer>
          < OrderDonePage />
          </SimpleDrawer>
          </AuthGuard>} />
        <Route path="/orderHistory" element={
          <AuthGuard>
            <SimpleDrawer>
            < OrderHistoryPage />
            </SimpleDrawer>
            </AuthGuard>} />

      </Routes>
    </BrowserRouter>
  )

}
