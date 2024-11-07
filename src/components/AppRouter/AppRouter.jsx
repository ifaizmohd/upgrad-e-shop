import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";

const HomePage = lazy(() => import("../screens/Home/Home"));
const LoginPage = lazy(() => import("../screens/Login/Login"));
const SignupPage = lazy(() => import("../screens/Signup/Signup"));
const ProductsPage = lazy(() => import("../screens/Products/Products"));
const ProductDetailPage = lazy(() =>
  import("../screens/ProductDetail/ProductDetail")
);
const OrdersPage = lazy(() => import("../screens/Orders/Orders"));
const AdminRoute = lazy(() => import("../AdminRoute/AdminRoute"));
const AddProductPage = lazy(() => import("../screens/AddProduct/AddProduct"));

/**
 * This component defines the main routing structure for the application.
 * It uses the BrowserRouter to enable routing and defines multiple routes using the Routes and Route components.
 * To add more routes, just use the Route component, import your route, and use it in the similar manner.
 * @returns {React.ReactElement}
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>...Loading</div>}>
        <NavigationBar />
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<HomePage />} />
          {/* Login Page Route */}
          <Route path="/login" element={<LoginPage />} />
          {/* Signup Page Route */}
          <Route path="/sign-up" element={<SignupPage />} />
          {/* Products Page Route */}
          <Route path="/products" element={<ProductsPage />} />
          {/* Product Detail Page Route (dynamic route with ID) */}
          <Route path="/products/:id" element={<ProductDetailPage />} />
          {/* Orders Page Route */}
          <Route path="/orders" element={<OrdersPage />} />
          {/* Add Products Page Route */}
          <Route element={<AdminRoute />}>
            <Route path="/add-product" element={<AddProductPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
