import { useEffect, useState } from "react";
import { Product } from "../components/product/product";
import axiosInstance from "../service/axiosInstance";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

export const Search = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;
    const [end, setEnd] = useState(false);
    const [moreLoading, setMoreLoading] = useState(true);

    useEffect(() => {
        // 새로고침 시 페이지 초기화
        setProducts([]);
        setCurrentPage(0);
        setEnd(false);

        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');

        setIsLoading(true);
        axiosInstance.get(`/api/product/search/${currentPage}?query=${query}`)
            .then(res => {
                setProducts(res.data.list); // 처음 데이터 세팅
                if (res.data.list.length < itemsPerPage) {
                    setEnd(true); // 더 이상 데이터가 없으면 end 상태 설정
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [location.search, currentPage]); // currentPage나 location.search가 변경될 때마다 실행

    const loadMore = () => {
        if (!end) {
            setCurrentPage(prevPage => prevPage + 1);
            setMoreLoading(true); // 로딩 상태 표시
        }
    };

    useEffect(() => {
        if (currentPage > 0) {
            const queryParams = new URLSearchParams(location.search);
            const query = queryParams.get('query');
            axiosInstance.get(`/api/product/search/${currentPage}?query=${query}`)
                .then(res => {
                    setProducts(prevProducts => [
                        ...prevProducts,
                        ...res.data.list
                    ]);
                    if (res.data.list.length < itemsPerPage) {
                        setEnd(true);
                    }
                    setMoreLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setMoreLoading(false);
                });
        }
    }, [currentPage]); // currentPage 변경 시 추가 데이터 로드

    return (
        <div>
            <div className="container mt-5 mx-auto ml-4 text-lg md:text-2xl md:mx-auto lg:my-6 lg:text-4xl lg:mx-auto"
                 style={{ fontFamily: 'sb' }}>
                총 {products.length} 개의 검색결과가 있습니다.
            </div>

            <div className={`container pl-3 pr-3 max-w-screen-lg xl:max-w-screen-2xl mx-auto mt-2 grid md:grid-cols-3 sm:grid-cols-3 grid-cols-3 place-items-center gap-x-3 md:gap-x-10 gap-y-0.5 transition-opacity duration-500 ${isLoading ? 'opacity-70' : 'opacity-100'}`}>
                {isLoading
                    ? Array.from({ length: itemsPerPage }).map((_, index) => (
                        <div key={index} className="flex w-80 h-80 lg:w-72 lg:h-72 xl:w-96 xl:h-96 flex-col gap-4 animate-pulse">
                            <div className="bg-gray-200 h-72 lg:h-80 w-full rounded-md"></div>
                            <div className="bg-gray-200 h-4 w-28 rounded-md"></div>
                            <div className="bg-gray-200 h-4 w-full rounded-md"></div>
                            <div className="bg-gray-200 h-4 w-full rounded-md"></div>
                        </div>
                    ))
                    : products.map((product) => (
                        <Product
                            key={`key-${product.id}`}
                            product={product}
                        />
                    ))
                }
            </div>

            {!isLoading && !end && (
                <div className="flex justify-center mb-12">
                    <button
                        onClick={loadMore}
                        className="btn btn-outline w-80 md:w-96 text-black bg-white rounded-xl"
                    >
                        {
                            moreLoading ?
                                (<FontAwesomeIcon icon={faArrowDown} />) :
                                (<span className="loading loading-dots loading-sm"></span>)
                        }
                    </button>
                </div>
            )}
        </div>
    );
};
