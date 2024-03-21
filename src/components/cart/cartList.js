
export const CartList = ({
                             cart,
                             convertPrice,
                             checkLists,
                             handleQuantity,
                             handleRemove,
                             handleCheckList,
                         }) => {
    return (
        <section className="max-w-4xl xl:max-w-7xl h-48 border-2 border-gray-300 rounded-xl mx-auto mt-8 grid grid-cols-4 justify-items-center items-center">
            <input
                type="checkbox"
                id={cart.id}
                onChange={(e) => {
                    handleCheckList(e.currentTarget.checked, `${cart.id}`);
                }}
                checked={checkLists.includes(`${cart.id}`)}
                className="w-5 h-5 border-2 border-green-400 rounded-full appearance-none cursor-pointer checked:bg-green-400 checked:border-none"
            />
            <div className="flex w-80 items-center">
                <div className="w-36 h-36 rounded-10">
                    <img src={`http://localhost:8080${cart.img}`} alt="product-img" className="w-full h-full rounded-2xl" />
                </div>
                <div className="ml-10 w-36">
                    <p className="text-xs leading-18 text-gray-800 mb-2">{cart.provider}</p>
                    <p className="text-base leading-22 text-black mb-2">{cart.name} / {cart.status}</p>
                    <p className="text-base leading-20 text-black mb-6">{convertPrice(cart.price)}원</p>
                    <p className="text-sm leading-18 text-gray-800">택배배송 / 무료배송</p>
                </div>
            </div>
            <div className=" relative w-8 h-10 border border-gray-400 rounded">
                <button className="absolute w-8 h-8 top-1/2 border rounded-full right-8 transform bg-gray-300 -translate-y-1/2 cursor-pointer"
                        onClick={() => {
                            handleQuantity("minus", cart.id, cart.quantity - 1);
                        }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                </button>
                <div className="absolute w-38 h-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300">
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{cart.quantity}</span>
                </div>
                <button className="absolute w-8 h-8 top-1/2 left-8 transform  bg-gray-300 rounded-full -translate-y-1/2 cursor-pointer"
                        onClick={() => handleQuantity("plus", cart.id, cart.quantity + 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </div>
            <div className="flex justify-between items-center w-full h-full">
                <div>
                    <p className="ml-20 text-2xl">{cart.price * cart.quantity}원</p>
                </div>
                <button className="h-8 w-8 p-1 mr-4 border-gray-300 border-2 rounded-full cursor-pointer" onClick={() => handleRemove(cart.id)}>
                    <img src="/images/icon-delete.svg" alt="delete" />
                </button>
            </div>


        </section>
    );
};
