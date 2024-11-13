import {Product} from "../components/product/product";
import React, {useEffect, useState} from "react";
import TabBar from "../components/navigationbar/TabBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../service/axiosInstance";

export const NewProduct = ({convertPrice}) => {

    const [status, setStatus] = useState("전체");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const [end, setEnd] = useState(false);
    const [moreLoading, setMoreLoading] = useState(true);


    useEffect(() => {
        // 페이지가 변경될 때마다 데이터를 가져옵니다.
        if(currentPage === 0) {
            setIsLoading(true);
        } else {
            setMoreLoading(false);
        }
        axiosInstance.get(`/api/product/list/${currentPage}`)
            .then(res => {
                setFilteredProducts(prevProducts => [
                    ...prevProducts,
                    ...res.data.data.list
                ]);

                if(res.data.data.list === 0) {
                    setEnd(true);
                }

                if(currentPage === 0) {
                    setIsLoading(false);
                }
                setMoreLoading(true);
            })
            .catch(err => {
                console.log(err);
                if(currentPage === 0) {
                    setIsLoading(false);
                } else {
                    setMoreLoading(false);
                }
            });
    }, [currentPage]); // currentPage가 변경될 때마다 실행

    const loadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    return (
        <div className="justify-center items-center">
            <TabBar/>
            <hr/>
            <div className="text-center mt-6 lg:mt-8 justify-center items-center">
                <p className="px-10 text-4xl lg:text-5xl" style={{fontFamily: 'sb'}}>
                    신제품
                </p>
            </div>

            <div className="container pl-3 pr-3 lg:pl-0 lg:pr-0 mx-auto mt-10 mb-8 items-center text-end">
                <hr/>
                <div className="flex mt-7 justify-between mb-6">
                    <label className="flex text-lg lg:text-xl font-bold" style={{fontFamily: 'sans-serif'}}>
                        {/*총 {filteredProducts.length}개의 상품이 있습니다.*/}
                    </label>
                    <div className="flex space-x-4">
                        <form className="">
                            <select id="countries"
                                    className="transition-[height] duration-500 ease-out bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={e => setStatus(e.target.value)}>
                                <option selected value="전체">전체</option>
                                <option value="냉동">냉동 보관</option>
                                <option value="냉장">냉장 보관</option>
                            </select>
                        </form>
                    </div>
                </div>

                <hr/>
            </div>


            <div
                className={`container max-w-screen-lg xl:max-w-screen-2xl mx-auto mt-6 mb-12 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-x-10 gap-y-10 transition-opacity duration-500`}>
                {filteredProducts.map((product) => {
                    return (
                        <Product
                            key={`key-${product.id}`}
                            product={product}
                            convertPrice={convertPrice}/>
                    );
                })}
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
    )
}

