import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from "react";
import {Navigationbar} from "./components/navigationbar/navigationbar";
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";


function App() {
    const[cart, setCart] = useState([]);
  return (
    <BrowserRouter>
        <Navigationbar cart={cart} />
        <Routes>
            <Route
                path="/"
                element={
                <Home/>
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
        </Routes>
    </BrowserRouter>
  );
}

export default App;
