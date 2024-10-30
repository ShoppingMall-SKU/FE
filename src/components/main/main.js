import {EventBanner} from "../eventBanner/eventBanner";
import {useEffect, useState} from "react";
import {getProducts} from "../../service/fetcher";
import {Product} from "../product/product";
import axios from "axios";
import TabBar from "../navigationbar/TabBar";

export const Main = ({ convertPrice, products, setProducts })=>{
    useEffect(() => {

    }, []);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // 3초 후 실행

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    }, []);


  return(
      <div>
          <TabBar/>
          <EventBanner/>
          <div className="container mt-5 mx-auto ml-4 text-lg md:text-2xl md:mx-auto lg:my-8 lg:text-4xl lg:mx-auto "
               style={{fontFamily: 'sb'}}>
              👋 이런 상품들이 있어요.
          </div>


          <div
              className={`container max-w-screen-lg xl:max-w-screen-2xl mx-auto mt-6 mb-12 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-x-10 gap-y-10 transition-opacity duration-500 ${isLoading ? 'opacity-70' : 'opacity-100'}`}>
              {isLoading
                  ? Array.from({length: 6}).map((_, index) => (
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
                          convertPrice={convertPrice}
                      />
                  ))
              }
          </div>
      </div>
  );
};