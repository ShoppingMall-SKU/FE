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
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const tabs = [
        { name: '신제품', value: 'new', path: '/new' },
        { name: '베스트', value: 'best', path: '/best' },
        { name: '특가 상품', value: 'sales', path: '/sales' },
        { name: '이벤트', value: 'event', path: '/event' },
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
        <div className="flex p-1 justify-between space-x-0 shadow-md">
            {isSidebarOpen && (
                <div
                    className={`fixed inset-0 bg-black z-10 transition-opacity duration-300 ease-in-out ${
                        isSidebarOpen ? 'opacity-50' : 'opacity-0'
                    }`}
                    onClick={toggleSidebar}
                />
            )}
            <div id="drawer-navigation"
                 className={`fixed left-0 top-0 h-full w-64 bg-gray-200 shadow-lg z-20 transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >

                <aside id="sidebar-multi-level-sidebar"
                       className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                       aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <button
                                    type="button"
                                    onClick={toggleDropdown}
                                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                    aria-controls="dropdown-example"
                                    aria-expanded={isOpen}
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path fill-rule="evenodd"
                                              d="M14 7h-4v3a1 1 0 0 1-2 0V7H6a1 1 0 0 0-.997.923l-.917 11.924A2 2 0 0 0 6.08 22h11.84a2 2 0 0 0 1.994-2.153l-.917-11.924A1 1 0 0 0 18 7h-2v3a1 1 0 1 1-2 0V7Zm-2-3a2 2 0 0 0-2 2v1H8V6a4 4 0 0 1 8 0v1h-2V6a2 2 0 0 0-2-2Z"
                                              clip-rule="evenodd"/>
                                    </svg>

                                    <span
                                        className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">쇼핑몰 메뉴</span>
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                         fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="m1 1 4 4 4-4"/>
                                    </svg>
                                </button>
                                <ul id="dropdown-example" className={`py-2 space-y-2 ${isOpen ? '' : 'hidden'}`}>
                                    <li>
                                        <a href="/new"
                                           className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">신제품</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">베스트
                                            상품</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">특가
                                            상품</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#"
                                   className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg
                                        className="w-6 h-6 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd"
                                              d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">장바구니</span>
                                    <span
                                        className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        viewBox="0 0 20 18">
                                        <path
                                            d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">내 정보</span>
                                </a>
                            </li>
                            <li>
                                <a href="/login"
                                   className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 18 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">로그인</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>


            </div>
            <div className="flex flex-auto space-x-1.5">
                <button onClick={toggleSidebar} className="p-2 ml-4">
                    <FontAwesomeIcon icon={faBars} className="h-4 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" color="black"/>
                </button>
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        className="p-2 text-center mt-1 text-gray-800 hover:bg-gray-200 rounded-xl flex-1 ml-5 mr-5 text-xs md:text-base lg:text-lg"
                        onClick={() => {
                            setActiveTab(tab.value);
                            navigate(tab.path); // 직접 navigate 호출
                        }}
                        style={{fontFamily: 'sb'}}>
                        {tab.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabBar;
