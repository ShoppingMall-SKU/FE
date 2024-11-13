import {useEffect, useState} from "react";
import axiosInstance from "../../service/axiosInstance";
import {Order} from "./order";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

export const User_info = () => {
    const [userInfo, setUserInfo] = useState({});
    const [displayedOrders, setDisplayedOrders] = useState([]);
    const [orders, setOrders] = useState([
            {
                "message": "선물용입니다.",
                "order_date": "2024-11-11",
                "receiver_address": "서울특별시 중구 세종대로 110",
                "receiver_name": "김수연",
                "receiver_phone": "010-1234-5678",
                "total_price": 45000,
                "price": 15000,
                "ship_status": "배송 중",
                "quantity": 3,
                "user_id": 44,
                "img": "/images/image001.png",
                "name": "test"
            },
            {
                "message": "부모님께 전달해 주세요.",
                "order_date": "2024-11-10",
                "receiver_address": "경기도 성남시 분당구 정자1로 123",
                "receiver_name": "박지훈",
                "receiver_phone": "010-2345-6789",
                "total_price": 60000,
                "price": 20000,
                "ship_status": "배송 준비 중",
                "quantity": 3,
                "user_id": 44,
                "img": "/images/image001.png",
                "name": "test"
            },
            {
                "message": "꼼꼼하게 포장 부탁드립니다.",
                "order_date": "2024-11-09",
                "receiver_address": "부산광역시 해운대구 우동 321-45",
                "receiver_name": "최민호",
                "receiver_phone": "010-3456-7890",
                "total_price": 32000,
                "price": 16000,
                "ship_status": "배송 완료",
                "quantity": 2,
                "user_id": 44,
                "img": "/images/image001.png",
                "name": "test"
            },
            {
                "message": "빠른 배송 부탁드립니다.",
                "order_date": "2024-11-08",
                "receiver_address": "인천광역시 남동구 서창남로 77",
                "receiver_name": "윤서영",
                "receiver_phone": "010-4567-8901",
                "total_price": 51000,
                "price": 17000,
                "ship_status": "배송 중",
                "quantity": 3,
                "user_id": 44,
                "img": "/images/image001.png",
                "name": "test"
            },
            {
                "message": "결혼 기념일 선물입니다.",
                "order_date": "2024-11-07",
                "receiver_address": "대전광역시 유성구 대학로 99",
                "receiver_name": "이정훈",
                "receiver_phone": "010-5678-9012",
                "total_price": 55000,
                "price": 27500,
                "ship_status": "배송 준비 중",
                "quantity": 2,
                "user_id": 44,
                "img": "/images/image001.png",
                "name": "test"
            },
            {
                "message": "감사 선물로 보냅니다.",
                "order_date": "2024-11-06",
                "receiver_address": "광주광역시 북구 하서로 21",
                "receiver_name": "문정민",
                "receiver_phone": "010-6789-0123",
                "total_price": 47000,
                "price": 23500,
                "ship_status": "배송 완료",
                "quantity": 2,
                "user_id": 44,
                "img": "/images/image001.png",
                "name": "test"
            },
            {
                "message": "집 앞에 놓아주세요.",
                "order_date": "2024-11-05",
                "receiver_address": "서울특별시 강남구 삼성로 200",
                "receiver_name": "한지민",
                "receiver_phone": "010-7890-1234",
                "total_price": 58000,
                "price": 29000,
                "ship_status": "배송 중",
                "quantity": 2,
                "user_id": 44,
                "img": "/images/image001.png",
                "name": "test"
            },
            {
                "message": "생일 선물 포장 부탁드립니다.",
                "order_date": "2024-11-04",
                "receiver_address": "경기도 수원시 영통구 영통로 300",
                "receiver_name": "김태우",
                "receiver_phone": "010-8901-2345",
                "total_price": 62000,
                "price": 31000,
                "ship_status": "배송 준비 중",
                "quantity": 2,
                "user_id": 44,
                "img": "/images/image001.png",
                "name": "test"
            },
            {
                "message": "교환 요청드립니다.",
                "order_date": "2024-11-03",
                "receiver_address": "부산광역시 해운대구 달맞이길 52",
                "receiver_name": "박민정",
                "receiver_phone": "010-9012-3456",
                "total_price": 43000,
                "price": 21500,
                "ship_status": "배송 완료",
                "quantity": 2,
                "user_id": 44,
                "img": "/images/image001.png",
                "name": "test"
            },
            {
                "message": "추석 선물용입니다.",
                "order_date": "2024-11-02",
                "receiver_address": "대구광역시 달서구 월성로 151",
                "receiver_name": "홍길동",
                "receiver_phone": "010-0123-4567",
                "total_price": 50000,
                "price": 25000,
                "ship_status": "배송 중",
                "quantity": 2,
                "user_id": 44,
                "img": "/images/image001.png",
                "name": "test"
            }
        ]

    );
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const ordersPerPage = 4; // 한 번에 표시할 주문 개수


    useEffect(() => {
        axiosInstance.get('/api/user/info')
            .then(res => {
                console.log(res.data.data)
                setUserInfo(res.data.data);  // 서버에서 받은 데이터를 userInfo에 저장
            })
            .catch(err => {
                console.log(err);
            })
        const sortedOrders = orders.sort((a, b) => {
            // order_date를 Date 객체로 변환하여 비교
            const dateA = new Date(a.order_date);
            const dateB = new Date(b.order_date);
            return dateB - dateA; // 최신순으로 정렬 (내림차순)
        });
        setOrders(sortedOrders);

    }, []);
    useEffect(() => {
        const indexOfLastOrder = currentPage * ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
        const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
        setDisplayedOrders(currentOrders);
    }, [currentPage, orders]);

    const handleNextPage = () => {
        if (displayedOrders.length === ordersPerPage) {
            setCurrentPage(prev => prev + 1); // 다음 페이지로 이동
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1); // 이전 페이지로 이동
        }
    };

    return (
        <div className="mt-10 mx-auto flex-col px-5 py-5 mb-12 md:flex-row justify-center max-w-screen-lg items-center shadow-2xl rounded-2xl">
            <div className="flex px-8 py-10 card bg-base-200 w-full">
                <span className="flex text-xl ml-5 md:ml-10 mb-7 md:mb-12 font-bold md:text-6xl">🎉 반갑습니다 ! {userInfo.name} 님.</span>

                <div className="md:flex">
                    <div className="flex-col card p-4 card-body bg-base-300 shadow-xl">
                        <p className="flex font-semibold text-lg md:text-xl">🚚 이런 상품들을 주문했어요.</p>
                        <div className="flex-col">
                            {orders && orders.length > 0 ? (
                                displayedOrders.map((order, index) => (
                                    <div className="flex" key={index}>
                                        <Order order={order}/>
                                    </div>
                                ))
                            ) : (
                                <div className="flex mx-auto my-auto h-48 justify-center items-center">
                                    <FontAwesomeIcon className="mr-3 text-gray-600" size="2xl"
                                                     icon={faCircleExclamation}/>
                                    <p className="text-gray-600 font-semibold">주문한 상품이 없습니다.</p>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                className="btn btn-ghost"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                이전
                            </button>
                            <button
                                className="btn btn-ghost"
                                onClick={handleNextPage}
                                disabled={displayedOrders.length < ordersPerPage}
                            >
                                다음
                            </button>
                        </div>
                    </div>

                    <div className="flex divider lg:divider-horizontal"></div>

                    <div className="flex card justify-start card-body md:w-80 bg-base-300 shadow-xl">
                        <div className='flex-row'>
                            <p className="flex-row font-semibold text-xl">ℹ️ 회원 정보</p>
                        </div>
                        <div className='card-body p-0 flex items-center'>
                            <span className='flex gap-x-4 items-center'>
                                <input type="text" placeholder={userInfo.name}
                                       className={`input input-bordered w-full max-w-xs `}/>
                                <button className='btn btn-xs md:btn-sm shadow-md'>수정</button>
                            </span>
                            <span className='flex gap-x-4 items-center'>
                                <input type="text" placeholder={userInfo.phone}
                                       className={`input input-bordered w-full max-w-xs `}/>
                                <button className='btn btn-xs md:btn-sm shadow-md'>수정</button>
                            </span>
                            <span className='flex gap-x-4 items-center'>
                                <input type="text" placeholder={userInfo.email}
                                       className={`disabled input input-bordered w-full max-w-xs `}/>
                                <button className='btn btn-xs md:btn-sm shadow-md'>수정</button>
                            </span>
                            <span className='flex gap-x-4 items-center'>
                                <input type="text" placeholder={userInfo.streetAdr}
                                       className={`input input-bordered w-full max-w-xs `}/>
                                <button className='btn btn-xs md:btn-sm shadow-md'>수정</button>
                            </span>
                            <span className='flex gap-x-4 items-center'>
                                <input type="text" placeholder={userInfo.zipcode}
                                       className={`input input-bordered w-full max-w-xs `}/>
                                <button className='btn btn-xs md:btn-sm shadow-md'>수정</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};