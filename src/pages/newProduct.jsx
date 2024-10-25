import {Product} from "../components/product/product";
import React, {useEffect, useState} from "react";
import TabBar from "../components/navigationbar/TabBar";
import {faBolt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


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

            <hr className="mb-10"/>
            <div className="flex items-center">
                <span><FontAwesomeIcon className="ml-12" icon={faBolt} size="7x" style={{color: "#000000",}}/></span>
                <span className="px-10 text-5xl" style={{fontFamily:'sb'}}>
                    신제품
                </span>
            </div>
            <hr className="mt-10"/>

            <div className="mb-12 text-center justify-center items-center">
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="전체">전체</option>
                    <option value="냉장">냉장보관</option>
                    <option value="냉동">냉동보관</option>
                </select>
                <input
                    type="number"
                    placeholder="최대 가격"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
            </div>

                <label className="px-20 mt-12 ml-12 text-3xl font-bold" style={{fontFamily:'sb'}}>
                    총 {filteredProducts.length}개의 상품이 있습니다.
                </label>
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

