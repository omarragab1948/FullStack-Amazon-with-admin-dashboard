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
import Adminauth from "./components/Adminauth";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Users from "./pages/Users/Users";
import Products from "./pages/Products/Products";
import Categoies from "./pages/Categories/Categoies";
import DashboardOutlet from "./components/DashboardOutlet/DashboardOutlet";

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
        <Route
          path="/admindashboard"
          element={
            <Adminauth>
              <DashboardOutlet />
            </Adminauth>
          }
        >
          <Route path="/admindashboard" element={<AdminDashboard />} />

          <Route path="/admindashboard/users" element={<Users />} />
          <Route path="/admindashboard/products" element={<Products />} />
          <Route path="/admindashboard/categories" element={<Categoies />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
