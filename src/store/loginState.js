import { createSlice } from "@reduxjs/toolkit";

const getCookieValue = (name) => {
    //console.log(document.cookie)
    return document.cookie
        .split('; ')
        .find((row) => row.startsWith(name + '='))
        ?.split('=')[1];
};

// Authorization 쿠키가 있는지 확인
const isLoggedIn = !!getCookieValue("Authorization");
console.log(isLoggedIn);
export const loginState = createSlice({
    name : 'loggedIn',
    initialState : {
        value : isLoggedIn,
    },
    reducers : {
        changeState(state) {
            state.value = ! state.value;
        },
        setLoginState(state, action) {
            state.value = action.payload;
        }
    }
})

export const { changeState, setLoginState } = loginState.actions;
export default loginState.reducer;