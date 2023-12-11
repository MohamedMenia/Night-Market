import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Authpage from "./pages/auth/Auth";
import ShopPage from "./pages/shop/Shop";
import CheckoutPage from "./pages/checkout/Checkout";
import PurchasedItemPage from "./pages/purchasedItems/PurchasedItems";
import Product from "./pages/product/Product";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/auth" element={<Authpage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/purchased-items" element={<PurchasedItemPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
