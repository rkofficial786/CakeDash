import "./App.css";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Search from "./components/Search";
import PrivateRoute from "./components/routes/Private";
import Dashboard from "./pages/user/Dashboard";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Users from "./pages/admin/Users";
import AdminOrders from "./pages/admin/AdminOrders";
import Products from "./pages/admin/Products";
import ProductDetails from "./pages/ProductDetails";
import CategoryProduct from "./pages/CategoryProduct";
import Checkout from "./pages/Checkout";
import Discounts from "./pages/admin/Discounts";
import ForgotPassword from "./pages/auth/ForgotPassword";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
        <Route path="*" element={<Error />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/checkout" element={<Checkout />} /> */}

        <Route path="/search" element={<Search />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-products" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/discount" element={<Discounts />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />

          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
