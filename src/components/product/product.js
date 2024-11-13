import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";

export const Product = ({ product }) => {
    const { id, name, status, brand, price, img, sale, stock } = product;

    useEffect(() => {
    }, []);


    return (
           product && (
            <div
                className="container h-72 shadow-xl rounded-2xl p-2 lg:h-5/6 lg:mb-32 md:p-5 max-w-48 md:max-w-xs lg:max-w-screen-sm lg:max-h-screen pl-2 pr-2 lg:pr-4 lg:pl-4 justify-center flex flex-col mb-8">
                <Link to={`/product/${id}`}>
                    <div className="w-20 h-20 lg:w-64 lg:h-64 xl:w-96 xl:h-96 rounded-10 mx-auto mb-1.5 md:mb-5">
                        <img className="w-full h-full rounded-10 border border-gray-300" src={img} alt="product" />
                    </div>

                <div className="mb-1.5 md:mb-3">
                        <span className="text-xs font-thin md:text-lg leading-22 text-gray-600" style={{fontFamily: 'sb'}}>{brand}</span>
                    { stock > 10 ?
                        (<span></span>) :
                        (<span className="inline-block bg-red-600 text-white text-base ml-3 font-bold px-2 py-1 rounded-xl" style={{fontFamily: 'sb'}}>품절 임박!</span>)
                    }
                </div>

                <div className="mb-2 md:mb-3">
                    {name.length > 9 ?
                        (<span className="text-xs md:text-3xl leading-22 text-black" style={{fontFamily: 'sb'}}> {name.slice(0, 19)} ..</span>) :
                        (<span className="text-xs md:text-3xl leading-22 text-black" style={{fontFamily: 'sb'}}>{name}</span>)
                    }
                </div>
                <div className="md:mb-2 text-xs md:text-base leading-22 text-black" style={{fontFamily: 'sb'}}>{status} 보관 제품</div>

                {/*<div className="mb-2">*/}
                {/*    <span className="text-base">남은 수량 : </span>*/}
                {/*    {stock > 10 ?*/}
                {/*        (<span className="text-base" style={{fontFamily: 'sb'}}>{stock}개</span>) :*/}
                {/*        (<span className="text-base text-red-600 font-bold">{stock}개</span>)*/}
                {/*    }*/}
                {/*</div>*/}

                <div>
                    {sale > 0 ? (
                            <>
                                <div>
                                    <span className="text-xs md:text-lg font-bold leading-30 text-red-600 line-through">{(price).toLocaleString()} 원</span>
                                    <span className="text-xs md:text-lg font-bold leading-30 text-red-600">  -{sale}%</span>
                                </div>

                                <span className="text-sm md:text-3xl font-bold leading-30 text-black">{(price * ((100 - sale) / 100)).toLocaleString()}</span>
                                <span className="text-sm md:text-base leading-20 text-black"> 원</span>
                            </>) :
                        (
                            <div className="mb-6">
                                <span className="text-sm md:text-3xl font-bold leading-30 text-black">{(price).toLocaleString()}</span>
                                <span className="text-sm md:text-base leading-20 text-black"> 원</span>
                            </div>
                        )
                    }
                </div>
                </Link>
            </div>
        )
    );
};
