import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import axios from "axios";

export const Navigationbar = ({ cart }) => {
    const [cookies] = useCookies();
    const [checkCookie ,setCheckCookie] = useState(!!cookies.token);
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const token = cookies.token;
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            // 서버에 로그아웃 요청 보내기
            const response = await axios.get('http://localhost:8080/api/user/logout');

            // 응답을 받은 후에 상태 변경
            setCheckCookie(false);
            // 쿠키 삭제
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            navigate('/');
        } catch (error) {
            console.error('로그아웃 요청 실패:', error);
        }
    };

    useEffect(() => {
        setCheckCookie(!!cookies.token);
    }, [cookies.token]);

    return (
        <header className="w-full h-20 flex justify-around items-center shadow-md">
            <div className="flex items-center ml-4">
                <Link to="/">
                    <h1 className="mr-8">
                        <img src="/images/logo4.png" alt="logo" className="w-32 h-10" />
                    </h1>
                </Link>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="상품을 검색해보세요!"
                        className="w-96 h-12 pl-8 pr-4 border-2 border-green-600 rounded-full text-xl focus:outline-none"
                    />
                    <img
                        src="/images/icon-search.svg"
                        alt="search"
                        className="absolute top-3 left-2 w-5 h-5"
                    />
                </div>
            </div>

            <div className="flex items-center mr-4">
                <Link to="/cart" className="relative mr-4">
                    <div className="flex items-center">
                        <img
                            src="/images/icon-shopping-cart.svg"
                            alt="cart"
                            className="w-12 h-10"
                        />
                        <span className="text-sm text-gray-600 ml-1">장바구니</span>
                        {cart.length >= 1 && (
                            <div className="absolute top-0 right-0 w-5 h-5 bg-red-600 rounded-full flex justify-center items-center">
                                <p className="text-white text-xs">{cart.length}</p>
                            </div>
                        )}
                    </div>
                </Link>
                {checkCookie ? (
                    <>
                        <Link to="/user_info" className="flex items-center">
                            <img
                                src="/images/icon-user.svg"
                                alt="user"
                                className="w-12 h-10 mr-1"
                            />
                            <span className="text-sm text-gray-600">내정보</span>
                        </Link>
                        <button className="ml-8 border p-1 bg-red-400 rounded-xl text-white border-red--400" onClick={logoutHandler}>로그아웃</button>
                    </>
                ) : (
                    <Link to="/login" className="flex items-center">
                        <img
                            src="/images/icon-user.svg"
                            alt="user"
                            className="w-12 h-10 mr-1"
                        />
                        <span className="text-sm text-gray-600">로그인</span>
                    </Link>
                )}
            </div>
        </header>
    );
};