import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {faMagnifyingGlass, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axiosInstance from "../../service/axiosInstance";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {changeState} from "../../store/loginState";

export const Navigationbar = ({ cart }) => {

    const [cookies,setCookies, removeCookies] = useCookies(["Authorization"]);
    const [checkCookie, setCheckCookie] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");


    const isLoggedIn = useSelector((state) => {return state.loggedIn.value})

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
                notify("로그아웃 되었습니다.", 'success');
                removeCookies('Authorization');
                dispatch(changeState());
                navigate('/');
            }).catch(err => {
                console.log(err);
        })
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        console.log(isLoggedIn);
    }, [cookies]);

    return (
        <header className="w-full max-w-screen h-20 flex justify-center items-center shadow-md px-5">
            <div className="flex w-full justify-between items-center space-x-5">
                <Link to="/">
                    <img src="/images/logo3.png" alt="logo" className="xl:h-20 xl:w-20 lg:h-10 lg:w-10 w-10"/>
                </Link>
                <div className="flex relative lg:max-w-xl lg:w-full h-10 items-center justify-center">
                    <input
                        type="text"
                        placeholder="상품을 검색해보세요 !"
                        className="input input-bordered size-10 text-xs input-success w-full lg:max-w-96"
                        value={query} // query 상태와 연결
                        onChange={handleInputChange}
                    />
                    <Link to={{
                        pathname: '/search',
                        search: `?query=${query}`,
                    }}>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="flex ml-3 h-4 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8"
                            style={{color: "#16a34a"}}
                        />
                    </Link>
                </div>

                <div className="flex items-center justify-center space-x-2 md:space-x-4">
                    <Link to="/cart" className="flex items-center relative">
                    <img src="/images/icon-shopping-cart.svg" alt="cart" className="lg:w-12 max-w-96"/>
                    <span className="text-sm text-gray-600 ml-2 hidden md:inline">장바구니</span>
                    {cart.length >= 1 && (
                        <div
                            className="absolute -top-2 lg:right-12 -right-2 w-5 h-5 bg-red-600 rounded-full flex justify-center items-center">
                            <p className="text-white text-xs">{cart.length}</p>
                        </div>
                    )}
                </Link>

                {isLoggedIn ? (
                    <>
                        <Link to="/user_info" className="flex items-center">
                            <img src="/images/icon-user.svg" alt="user" className="lg:w-12 max-w-96 mr-1"/>
                            <span className="text-sm text-gray-600 hidden md:inline">내정보</span>
                        </Link>
                        {/*<button*/}
                        {/*    className="btn btn-info text-white "*/}
                        {/*    onClick={logoutHandler}*/}
                        {/*>*/}
                        {/*    로그아웃*/}
                        {/*</button>*/}
                        <button
                            className="btn btn-info text-white flex items-center gap-2"
                            onClick={logoutHandler}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </button>

                    </>
                ) : (
                    <Link to="/login" className="flex items-center">
                        <img src="/images/icon-user.svg" alt="user" className="lg:w-12 max-w-96 w-10 mr-1"/>
                        <span className="text-sm text-gray-600 hidden md:inline">로그인</span>
                    </Link>
                )}
            </div>
            </div>
        </header>

    );
};