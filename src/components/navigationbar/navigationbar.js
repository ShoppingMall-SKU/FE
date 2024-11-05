import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axiosInstance from "../../service/axiosInstance";
import {toast} from "react-toastify";

export const Navigationbar = ({ cart }) => {

    const [cookies,setCookies, removeCookies] = useCookies(["Authorization"]);
    const [checkCookie, setCheckCookie] = useState(false);
    const navigate = useNavigate();

    const notify = (data, state) => {
        if(state === 'error') {
            toast.error(data, {position: "top-center", hideProgressBar: true, autoClose: 1500, className: 'mx-auto w-80 lg:w-auto lg:my-auto my-12'})}
        else if(state === 'success') {
            toast.success(data, {position: "top-center", hideProgressBar: true, autoClose: 1500, className: 'mx-auto w-80 lg:w-auto lg:my-auto my-12'});
        }
    };

    const logoutHandler = async () => {
        await axiosInstance.get('/api/user/logout')
            .then(res => {
                if(res.data.data === true) {
                    notify("로그아웃 되었습니다.", 'success');
                    removeCookies('Authorization');
                    setCheckCookie(false);
                    navigate('/');
                } else {
                    notify('에러 입니다.', 'error');
                }
            }).catch(err => {
                console.log(err);
        })
    };

    useEffect(() => {
        console.log(cookies);
        setCheckCookie(!!cookies.Authorization);
    }, []);

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
                            <img src="/images/icon-user.svg" alt="user" className="lg:w-12 w-20 mr-1"/>
                            <span className="text-sm text-gray-600 hidden md:inline">내정보</span>
                        </Link>
                        <button
                            className="btn btn-info text-white "
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