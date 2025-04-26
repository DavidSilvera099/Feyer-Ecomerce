import "./App.css";
import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import SpinnerLoading from "./components/utils/SpinnerLoading";

// Importación de las páginas principales
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./components/auth/login"));
const Register = lazy(() => import("./components/auth/register"));

// Importación de las páginas relacionadas con productos
const Products = lazy(() => import("./pages/products"));
const ProductPage = lazy(() => import("./pages/product-page"));

// Importación de las páginas relacionadas con el carrito y el administrador
const Cart = lazy(() => import("./pages/cart"));
const Admin = lazy(() => import("./pages/admin"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<SpinnerLoading />}>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products">
            <Route index element={<Products />} />
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
