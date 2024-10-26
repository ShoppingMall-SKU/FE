import {Product} from "../components/product/product";
import React, {useEffect, useState} from "react";
import TabBar from "../components/navigationbar/TabBar";

export const NewProduct = ({products, convertPrice}) => {

    const [filter, setFilter] = useState('');
    const [status, setStatus] = useState("전체");
    const [maxPrice, setMaxPrice] = useState(1000);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if(status === "전체") {
            setFilteredProducts(products);
        }else {
            const filtered = products.filter(p => p.status === status);
            setFilteredProducts(filtered);
        }
    }, [status, products]);


    return (
        <div className="justify-center items-center">
            <TabBar/>
            <div className="text-center mt-5 justify-center items-center">
                <p className="px-10 text-5xl" style={{fontFamily: 'sb'}}>
                    신제품
                </p>
            </div>

            <div className="container mx-auto mt-10 mb-8 items-center text-end">
                <hr/>
                <div className="flex mt-7 justify-between mb-6">
                    <label className="flex text-xl font-bold" style={{fontFamily: 'sans-serif'}}>
                        총 {filteredProducts.length}개의 상품이 있습니다.
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
                className="max-w-screen-xl mx-auto mt-10 mb-12 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-x-10 gap-y-70">
                {filteredProducts.map((product) => {
                    return (
                        <Product
                            key={`key-${product.id}`}
                            product={product}
                            convertPrice={convertPrice}/>
                    );
                })}
            </div>
        </div>
    )
}

