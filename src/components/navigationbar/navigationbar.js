import {Link} from "react-router-dom";

export const Navigationbar = ({ cart })=>{
    return(
        <header className="flex w-full justify-between h-24 shadow-xl">
            <div className="flex m-3 ml-20 w-5/12 items-center">
                <Link to="/">
                    <h1 className="w-28 h-8 mr-5">
                        <img src="/images/logo4.png" alt="logo" />
                    </h1>
                </Link>
                <div className="flex w-full border-4 border-green-400 rounded-3xl">
                    <input className="text-xl p-4 w-full rounded-3xl outline-none" type="text" placeholder="상품을 검색해보세요!" />
                    <img className="mx-2" src="/images/icon-search.svg" alt="search" />
                </div>
            </div>
            <div className="flex items-center mr-20">
                <Link to="/cart" className="w-16 h-12 flex">
                    <div >
                        <img src="/images/icon-shopping-cart.svg" alt="cart" />
                        <span>장바구니</span>
                    </div>
                </Link>
                <Link to="/login" className="flex ml-5 w-16 h-12">
                    <div >
                        <img src="/images/icon-user.svg" alt="user" />
                        <span>로그인</span>
                    </div>
                </Link>
            </div>
        </header>
    );
};