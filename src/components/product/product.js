import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";

export const Product = ({ product, convertPrice }) => {
    const { id, name, status, brand, price, img, sale, stock } = product;


    return (
           product && (
            <div
                className="container shadow-xl rounded-2xl p-5 max-w-xs lg:max-w-screen-sm lg:max-h-screen pl-7 pr-7 lg:pr-4 lg:pl-4 justify-center flex flex-col mb-8">
                <Link to={`/product/${id}`}>
                    <div className="w-64 h-80 lg:w-72 lg:h-72 xl:w-96 xl:h-96 rounded-10 mx-auto mb-5">
                        <img className="w-full h-full rounded-10 border border-gray-300" src={img} alt="product" />
                    </div>
                </Link>

                <div className="mb-3">
                        <span className="text-l leading-22 text-gray-600" style={{fontFamily: 'sb'}}>{brand}</span>
                    { stock > 10 ?
                        (<span></span>) :
                        (<span className="inline-block bg-red-600 text-white text-base ml-3 font-bold px-2 py-1 rounded-xl" style={{fontFamily: 'sb'}}>품절 임박!</span>)
                    }
                </div>

                <div className="mb-3">
                    {name.length > 10 ?
                        (<span className="text-3xl leading-22 text-black" style={{fontFamily: 'sb'}}> {name.slice(0, 8)} ...</span>) :
                        (<span className="text-3xl leading-22 text-black" style={{fontFamily: 'sb'}}>{name}</span>)
                    }
                </div>
                <div className="mb-2 text-base leading-22 text-black" style={{fontFamily: 'sb'}}>{status} 보관 제품</div>

                <div className="mb-2">
                    <span className="text-base">남은 수량 : </span>
                    {stock > 10 ?
                        (<span className="text-base" style={{fontFamily: 'sb'}}>{stock}개</span>) :
                        (<span className="text-base text-red-600 font-bold">{stock}개</span>)
                    }
                </div>

                <div>
                    {sale > 0 ? (
                            <>
                                <div>
                                    <span className="text-m font-bold leading-30 text-red-600 line-through">{convertPrice(price)} 원</span>
                                    <span className="text-m font-bold leading-30 text-red-600">  -{sale}%</span>
                                </div>

                                <span className="text-3xl font-bold leading-30 text-black">{convertPrice((price * ((100 - sale) / 100)))}</span>
                                <span className="text-base leading-20 text-black"> 원</span>
                            </>) :
                        (
                            <div className="mb-6">
                                <span className="text-3xl font-bold leading-30 text-black">{convertPrice(price)}</span>
                                <span className="text-base leading-20 text-black"> 원</span>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    );
};