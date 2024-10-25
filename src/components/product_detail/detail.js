import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Detail = ({ convertPrice, cart, setCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [count, setCount] = useState(1);

    const handleQuantity = (type) => {
        if (type === "plus") {
            setCount(count + 1);
        } else {
            if (count === 1) return;
            setCount(count - 1);
        }
    };

    const setQuantity = (id, quantity) => {
        const found = cart.filter((el) => el.id === id)[0];
        const idx = cart.indexOf(found);
        const cartItem = {
            id: product.id,
            img: product.img,
            status: product.status,
            name: product.name,
            quantity: quantity,
            price: product.price,
            provider: product.provider,
        };
        setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    };

    const handleCart = () => {
        const cartItem = {
            id: product.id,
            img: product.img,
            status: product.status,
            name: product.name,
            quantity: count,
            price: product.price,
            provider: product.provider,
        };
        const found = cart.find((el) => el.id === cartItem.id);
        if (found) setQuantity(cartItem.id, found.quantity + count);
        else setCart([...cart, cartItem]);
    };

    useEffect(() => {


        // const axiosProductDetail = async () => {
        //     const response = await axios.get(`http://localhost:8080/api/product/detail/${id}`);
        //     const data = response.data;
        //
        //     setProduct(data);
        // };
        // axiosProductDetail();
        setProduct({
            id : 1,
            name : "물건1",
            price : 123244,
            brand : "아무 브랜드",
            img : "/images/image004.png",
            status : "냉동",
            sale : 30,
            stock : 10
        })
    }, [id, product.price]);

    return (
        product && (
            <>
                <main className="max-w-full mx-auto flex flex-col mb-16 xl:mb-0 xl:flex-row justify-center xl:items-start items-center mt-16">
                    <section className="xl:w-1/3 w-8/12 h-1/3 flex flex-col mr-10">
                        <div className="w-full h-full rounded-10 mb-10 overflow-hidden">
                            <img src={product.img} alt="product" className="w-full h-full object-cover" />
                        </div>
                    </section>
                    <section className="xl:w-1/3 w-8/12 flex flex-col ">
                        <div className="flex xl:mt-5 flex-col mb-5 xl:mb-10">
                            <div className="mb-3">
                                <span className="text-lg mb-2 text-gray-600" style={{fontFamily: 'sb'}}>{product.brand}</span>
                                { product.stock > 10 ?
                                    (<span></span>) :
                                    (<span className="bg-red-600 text-white text-base ml-3 font-bold px-2 py-1 rounded-xl" style={{fontFamily: 'sb'}}>품절 임박 제품</span>)
                                }
                            </div>
                            <div className="mb-3">
                                <span className="text-3xl mb-5 text-black" style={{fontFamily: 'sb'}}>{product.name}</span>
                                <span className="ml-3" style={{fontFamily: 'sb'}}> {product.status}보관 제품</span>
                            </div>
                            <div>
                                {product.sale > 0 ? (
                                        <>
                                            <div>
                                                <span className="text-m font-bold leading-30 text-red-600 line-through">{convertPrice(product.price)} 원</span>
                                                <span className="text-m font-bold leading-30 text-red-600">  -{product.sale}%</span>
                                            </div>

                                            <span className="text-3xl font-bold leading-30 text-black">{convertPrice((product.price * ((100 - product.sale) / 100)))}</span>
                                            <span className="text-base leading-20 text-black"> 원</span>
                                        </>) :
                                    (
                                        <div className="mb-6">
                                            <span className="text-3xl font-bold leading-30 text-black">{convertPrice(product.price)}</span>
                                            <span className="text-base leading-20 text-black"> 원</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="mb-5">
                            <p className="text-sm text-gray-600">택배배송 / 무료배송</p>
                        </div>

                        <div className="w-full h-0.5 bg-gray-300 mb-5"></div>

                        <div className="flex items-center mb-5">
                            <button className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center" onClick={() => handleQuantity("minus")}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>
                            <div className="w-20 h-10 border border-gray-300 flex items-center justify-center rounded-2xl ml-3 mr-3">
                                <span>{count}</span>
                            </div>
                            <button className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center" onClick={() => handleQuantity("plus")}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>

                        <div className="w-full h-0.5 bg-gray-300 mb-5"></div>

                        <div className="flex justify-between items-center mb-5">
                            <p className="text-base font-semibold text-black">총 상품 금액</p>
                            <div className="flex items-center">
                                <p className="text-sm text-gray-600 mr-1">총 수량</p>
                                <p className="text-base text-green-600 mr-5">{count}개</p>
                                <p className="text-2xl font-semibold text-green-600">
                                    {convertPrice((product.price * ((100 - product.sale) / 100)) * count)}<span className="text-base">원</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button className="w-96 h-14 mr-5 rounded-md bg-green-600 text-white text-base font-semibold">바로 구매</button>
                            <button className="w-64 h-14 rounded-md bg-green-600 text-white text-base font-semibold" onClick={handleCart}>장바구니</button>
                        </div>
                    </section>
                </main>
            </>
        )
    );
};