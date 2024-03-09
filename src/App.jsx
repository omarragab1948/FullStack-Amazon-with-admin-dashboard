import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import Bascket from "./pages/Basket/Bascket";
import Profile from "./pages/Profile/Profile";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":category" element={<CategoryPage />} />
        <Route path=":category/:id" element={<ProductDetails />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/bascket" element={<Bascket />} />
        <Route path="/bascket/:category/:id" element={<ProductDetails />} />
        <Route path="/profile/:category/:id" element={<ProductDetails />} />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
