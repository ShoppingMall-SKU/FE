import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faBolt,
    faCartShopping,
    faHeart,
    faPercent,
    faStar,
    faUser,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";


const TabBar = ({products}) => {
    const [activeTab, setActiveTab] = useState(""); // 기본 탭을 ''으로 설정
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 관리
    const navigate = useNavigate();
    const tabs = [
        { name: '신제품', value: 'new' },
        { name: '베스트', value: 'best' },
        { name: '특가 상품', value: 'sales' },
        { name: '이벤트', value: 'event' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'new':
                navigate("/new");
            case 'best':
                return <div>장바구니 콘텐츠</div>;
            case 'sales':
                return <div>주문내역 콘텐츠</div>;
            case 'event':
                return <div>고객센터 콘텐츠</div>;
            default:
                return <div>홈 콘텐츠</div>;
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex m-2">
            {isSidebarOpen && (
                <div
                    className={`fixed inset-0 bg-black z-10 transition-opacity duration-300 ease-in-out ${
                        isSidebarOpen ? 'opacity-50' : 'opacity-0'
                    }`}
                    onClick={toggleSidebar}
                />
            )}
            <div
                className={`fixed left-0 top-0 h-full w-64 bg-gray-200 shadow-lg z-20 transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="m-5">
                    <FontAwesomeIcon className="mb-5 cursor-pointer" size="2xl" icon={faXmark} onClick={toggleSidebar}/>

                    <div className="m-3 cursor-pointer" onClick={() => {navigate('/cart')}}>
                    <span>
                        <FontAwesomeIcon icon={faCartShopping} size="xl" style={{color: "#000000"}}/>
                    </span>
                        <span className="ml-3">장바구니</span>
                    </div>

                    <div className="m-3 cursor-pointer" onClick={() => {navigate('/user_info')}}>
                    <span>
                        <FontAwesomeIcon icon={faUser} size="xl" style={{color: "#000000"}}/>
                    </span>
                        <span className="ml-3">마이페이지</span>
                    </div>

                    <div className="m-3 cursor-pointer" onClick={() => {navigate('/new')}}>
                    <span>
                        <FontAwesomeIcon icon={faBolt} size="xl" style={{color: "#000000",}}/>
                    </span>
                        <span className="ml-3">신상품</span>
                    </div>

                    <div className="m-3 cursor-pointer" onClick={() => {navigate('/best')}}>
                    <span>
                        <FontAwesomeIcon icon={faHeart} size="xl" style={{color: "#000000",}} />
                    </span>
                        <span className="ml-3">베스트 상품</span>
                    </div>

                    <div className="m-3 cursor-pointer" onClick={() => {navigate('/sales')}}>
                    <span>
                        <FontAwesomeIcon icon={faPercent} size="xl" style={{color: "#000000",}} />
                    </span>
                        <span className="ml-3">특가상품</span>
                    </div>

                    <div className="m-3 ">
                    <span>
                        <FontAwesomeIcon icon={faStar} size="xl" style={{color: "#000000",}} />
                    </span>
                        <span className="ml-3">이벤트</span>
                    </div>
                </div>

            </div>
            <div className="flex-1 flex">
                <button onClick={toggleSidebar} className="p-2 ml-8">
                    <FontAwesomeIcon icon={faBars} size="xl" color="black"/>
                </button>
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        className={`p-2 text-center mt-1 text-gray-800 hover:bg-gray-200 rounded-xl flex-1 ml-5 mr-5`}
                        onClick={ async () => {
                            setActiveTab(tab.value);
                            await renderContent();
                        }}
                        style={{ fontFamily: 'sb' }}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabBar;
