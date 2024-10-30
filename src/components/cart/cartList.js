
export const CartList = ({
                             cart,
                             convertPrice,
                             checkLists,
                             handleQuantity,
                             handleRemove,
                             handleCheckList,
                         }) => {
    return (
        <section className="flex w-11/12 flex-col lg:flex-row max-w-lg lg:max-w-5xl xl:max-w-7xl h-64 lg:h-48 border-2 border-gray-300 rounded-xl mx-auto mt-8 justify-items-center justify-center items-center">
            <div className=" flex flex-row justify-center items-center mt-5 lg:mt-0">

            <input
                type="checkbox"
                id={cart.id}
                onChange={(e) => {
                    handleCheckList(e.currentTarget.checked, `${cart.id}`);
                }}
                checked={checkLists.includes(`${cart.id}`)}
                className="checkbox mr-4 ml-4 lg:ml-5 lg:mr-5 checkbox-success w-5 h-5 border-2 border-green-400 rounded-full appearance-none cursor-pointer [--chkbg:theme(colors.green.400)] [--chkfg:white] checked:border-none  "
            />
            <div className="flex w-80 items-center justify-end">
                <div className="w-36 h-36 rounded-10">
                    <img src={cart.img} alt="product-img" className="w-full h-full rounded-2xl" />
                </div>
                <div className="ml-10 w-36">
                    <p className="text-base font-semibold leading-22 text-black mb-2">{cart.name}</p>
                    <p className="text-base leading-20 text-black mb-6">{convertPrice(Math.round(cart.price * (1 - (cart.sale * 0.01))))}원</p>
                    <p className="text-sm leading-18 text-gray-800">택배배송 / 무료배송</p>
                </div>
            </div>
            </div>

            <div className="container mx-auto justify-center items-center flex flex-row mt-5 lg:mt-0">

            <div className="flex mx-auto w-32 lg:w-48 lg:ml-12 lg:pl-10 items-center">
                <button className="flex btn btn-circle mr-4 w-1/5 h-5 cursor-pointer"
                        onClick={() => {
                            handleQuantity("minus", cart.id, cart.quantity - 1);
                        }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                </button>
                <div className="flex w-1/2 h-10 transform border border-gray-300">
                    <span className="flex font-bold pl-5 items-center justify-center">{cart.quantity}</span>
                </div>
                <button className="flex btn btn-circle ml-4 w-1/5 h-8 cursor-pointer"
                        onClick={() => handleQuantity("plus", cart.id, cart.quantity + 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </div>

            <div className="ml-5 flex justify-between items-center w-44 h-full">
                <div>
                    <p className=" font-bold mr-5 text-xl">{convertPrice(Math.round(cart.price * (1 - (cart.sale * 0.01))) * cart.quantity)} 원</p>
                </div>
                <button className="btn btn-circle btn-outline h-8 w-8 p-1 mr-4 border-gray-300 border-2 rounded-full cursor-pointer" onClick={() => handleRemove(cart.id)}>
                    <img src="/images/icon-delete.svg" alt="delete" />
                </button>
            </div>
            </div>


        </section>
    );
};
