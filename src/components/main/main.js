import {EventBanner} from "../eventBanner/eventBanner";
import {useEffect} from "react";
import {getProducts} from "../../service/fetcher";
import {Product} from "../product/product";
import axios from "axios";
import TabBar from "../navigationbar/TabBar";

export const Main = ({ convertPrice, products, setProducts })=>{
    useEffect(() => {

    }, []);


  return(
      <div>
          <TabBar />
          <EventBanner/>
          <div className="container mt-5 mx-auto ml-4 text-lg md:text-2xl md:mx-auto lg:my-8 lg:text-4xl lg:mx-auto " style={{fontFamily:'sb'}}>
              👋 이런 상품들이 있어요.
          </div>
          <div className="container max-w-screen-lg mx-auto mt-10 mb-12 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-x-10 gap-y-70">
              {products.map((product) => {
                  return (
                      <Product
                          key={`key-${product.id}`}
                          product={product}
                          convertPrice={convertPrice}
                      />
                  );
              })}
          </div>
      </div>
  );
};