import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import axios from "axios";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Navigationbar = ({ cart }) => {
    const [cookies] = useCookies();
    const [checkCookie ,setCheckCookie] = useState(!!cookies.token);
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            // const token = cookies.token;
            // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            // // 서버에 로그아웃 요청 보내기
            // const response = await axios.get('http://localhost:8080/api/user/logout');
            //
            // // 응답을 받은 후에 상태 변경
            // setCheckCookie(false);
            // // 쿠키 삭제
            // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            navigate('/');
        } catch (error) {
            console.error('로그아웃 요청 실패:', error);
        }
    };

    useEffect(() => {
        setCheckCookie(!!cookies.token);
    }, [cookies.token]);

    return (
        <header className="w-full max-w-screen h-20 flex justify-center items-center shadow-md px-5">
            <div className="flex w-full justify-between items-center space-x-5">
                <Link to="/">
                    <img src="/images/logo3.png" alt="logo" className="w-20 xl:w-20 xl:h-20 lg:h-10 h-7"/>
                </Link>
                <div className="flex relative lg:max-w-xl lg:w-full h-10 items-center justify-center">
                    <input
                        type="text"
                        placeholder="상품을 검색해보세요"
                        className="flex lg:max-w-screen-lg lg:py-6 lg:w-full pl-3 text-sm placeholder:text-sm md:placeholder:text-base md:text-sm lg:placeholder:text-lg h-9 border-2 border-green-600 rounded-lg lg:text-xl focus:outline-none"
                    />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="flex ml-3 h-4 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8"
                        style={{color: "#16a34a"}}
                    />
                </div>

            <div className="flex items-end space-x-4">
                <Link to="/cart" className="flex items-center relative">
                    <img src="/images/icon-shopping-cart.svg" alt="cart" className="lg:w-12 w-20"/>
                    <span className="text-sm text-gray-600 ml-2 hidden md:inline">장바구니</span>
                    {cart.length >= 1 && (
                        <div
                            className="absolute -top-2 lg:right-12 -right-2 w-5 h-5 bg-red-600 rounded-full flex justify-center items-center">
                            <p className="text-white text-xs">{cart.length}</p>
                        </div>
                    )}
                </Link>

                {checkCookie ? (
                    <>
                        <Link to="/user_info" className="flex items-center">
                            <img src="/images/icon-user.svg" alt="user" className="w-20 mr-1"/>
                            <span className="text-sm text-gray-600 hidden md:inline">내정보</span>
                        </Link>
                        <button
                            className="border p-1 bg-red-400 rounded-xl text-white"
                            onClick={logoutHandler}
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="flex items-center">
                        <img src="/images/icon-user.svg" alt="user" className="lg:w-12 w-20 mr-1"/>
                        <span className="text-sm text-gray-600 hidden md:inline">로그인</span>
                    </Link>
                )}
            </div>
            </div>
        </header>

    );
};