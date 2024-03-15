import {EventBanner} from "../eventBanner/eventBanner";
import {useEffect} from "react";
import {getProducts} from "../../service/fetcher";
import {Product} from "../product/product";
import axios from "axios";

export const Main = ({ convertPrice, products, setProducts })=>{
    useEffect(() => {
        const axiosProduct = async () =>{
            const response = await axios.get("http://localhost:8080/api/product/list");
            const data = response.data;

            setProducts(data);
        }

        axiosProduct();
    }, [setProducts]);

  return(
      <div>
          <EventBanner/>
          <div className="max-w-screen-xl mx-auto mt-10 mb-12 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-x-10 gap-y-70">
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