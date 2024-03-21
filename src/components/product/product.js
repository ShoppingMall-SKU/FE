import { Link } from "react-router-dom";

export const Product = ({ product, convertPrice }) => {
    const { id, name, status, brand, price, img } = product;

    return (
        product && (
            <div className="flex flex-col">
                <Link to={`/product/${id}`}>
                    <div className="w-96 h-96 rounded-10 mb-10">
                        <img className="w-full h-full rounded-10 border border-gray-300" src={`http://localhost:8080${img}`} alt="product" />
                    </div>
                </Link>

                <div className="mb-5">
                    <span className="text-sm leading-22 text-gray-600">{brand}</span>
                </div>

                <div className="mb-10">
                    <span className="text-base leading-22 text-black">{name}</span>
                    <span>  / </span>
                    <span className="text-base leading-22 text-black">{status}</span>
                </div>

                <div>
                    <span className="text-xl font-bold leading-30 text-black">{convertPrice(price)}</span>
                    <span className="text-base leading-20 text-black">원</span>
                </div>
            </div>
        )
    );
};