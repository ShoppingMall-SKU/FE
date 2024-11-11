import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "./loginState"

const store = configureStore({
    reducer : {
        loggedIn : loginReducer,
    }
})

export default store;