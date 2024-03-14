import {Link} from "react-router-dom";

export const Navigationbar = ({ cart })=>{
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
                <Link to="/login" className="flex items-center">
                    <img
                        src="/images/icon-user.svg"
                        alt="user"
                        className="w-12 h-10 mr-1"
                    />
                    <span className="text-sm text-gray-600">로그인</span>
                </Link>
            </div>
        </header>
    );
};