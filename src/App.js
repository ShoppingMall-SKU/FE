import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from "react";
import {Navigationbar} from "./components/navigationbar/navigationbar";
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Product from "./pages/product";
import Basket from "./pages/basket";


function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
  return (
    <BrowserRouter>
        <Navigationbar cart={cart} />
        <Routes>
            <Route
                path="/"
                element={
                <Home
                    convertPrice={convertPrice}
                    products={products}
                    setProducts={setProducts}
                />
                }
            />
            <Route
                path="/login"
                element={
                    <SignIn/>
                }
            />
            <Route
                path="/signUp"
                element={
                    <SignUp/>
                }
            />
            <Route
                path="/product/:id"
                element={
                    <Product
                        convertPrice={convertPrice}
                        cart={cart}
                        setCart={setCart}
                    />
                }
            />
            <Route
                path="/cart"
                element={
                    <Basket cart={cart} setCart={setCart} convertPrice={convertPrice} />
                }
            />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
