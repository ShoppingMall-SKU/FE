import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import {Navigationbar} from "./components/navigationbar/navigationbar";
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Product from "./pages/product";
import Basket from "./pages/basket";
import axios from "axios"
import {User_info} from "./components/user_info/user_info";
import {NewProduct} from "./pages/newProduct";


function App() {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // const axiosProduct = async () => {
        //     const response = await axios.get("http://localhost:8080/api/product/list");
        //     const data = response.data;
        //
        //     setProducts(data);
        // }
        //
        // axiosProduct();
        const products = [
            {
                id : 1,
                name : "물건1",
                price : 123244,
                brand : "아무 브랜드",
                img : "./images/image004.png",
                status : "냉장",
                sale : 30,
                stock : 30
            },
            {
                id :2,
                name : "이렇게까지 길어질줄은 몰랐게지만 이런 음식도 있다는 걸 알아둬",
                price : 123344,
                brand : "아무 브랜드",
                img : "./images/image001.png",
                status : "냉동",
                sale : 0,
                stock : 10
            },
            {
                id : 3,
                name : "물건3",
                price : 123344,
                brand : "아무 브랜드",
                img : "./images/image003.png",
                status : "냉동",
                sale : 10,
                stock : 10
            },
            {
                id : 4,
                name : "물건4",
                price : 123444,
                brand : "아무 브랜드",
                img : "./images/image005.png",
                status : "냉동",
                sale : 10,
                stock : 10
            },
            {
                id : 5,
                name : "물건5",
                price : 125344,
                brand : "아무 브랜드",
                img : "./images/image002.png",
                status : "냉동",
                sale : 10,
                stock : 10
            }
        ]
        setProducts(products);
    }, [setProducts]);


    const convertPrice = (price) => {
        // 소수점 제거 (필요에 따라 Math.floor() 또는 Math.round() 사용)
        const roundedPrice = Math.floor(price);  // 소수점 버림
        // 세 자리마다 쉼표 추가
        return roundedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


        return (
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                        <div>
                            <Navigationbar cart={cart}/>
                            <Home
                                convertPrice={convertPrice}
                                products={products}
                                setProducts={setProducts}
                            />
                        </div>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <SignIn/>
                        }
                    />
                    <Route
                        path="/user_info"
                        element={
                        <div>
                            <Navigationbar cart={cart}/>
                            <User_info/>
                        </div>
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
                        <div>
                            <Navigationbar cart={cart}/>
                            <Product
                                convertPrice={convertPrice}
                                cart={cart}
                                setCart={setCart}
                            />
                        </div>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <Basket cart={cart} setCart={setCart} convertPrice={convertPrice}/>
                        }
                    />
                    <Route
                        path="/new"
                        element={
                            <div>
                                <Navigationbar cart={cart}/>
                                <NewProduct products={products} convertPrice = {convertPrice}/>
                            </div>
                        }
                    />
                </Routes>
            </BrowserRouter>
        );
    }


export default App;
