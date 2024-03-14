export const CartHeader = ({ isAllChecked, handleCheckAll }) => {
    return (
        <>
            <header className="flex justify-center text-4xl font-semibold max-w-3xl mx-auto mt-16">
                <h1>장바구니</h1>
            </header>
            <div className="max-w-4xl xl:max-w-7xl mx-auto">
                <div className="grid grid-cols-4 bg-gray-100 rounded-2xl mt-12 h-16 justify-items-center items-center">
                    <div className="">
                        <input
                            type="checkbox"
                            checked={isAllChecked}
                            onChange={(e) => handleCheckAll(e.target.checked)}
                            className="w-5 h-5 border-2 border-green-400 rounded-full appearance-none cursor-pointer bg-white checked:bg-green-400 checked:border-none"
                        />
                    </div>
                    <span className="bg-gray-100">상품정보</span>
                    <span className="bg-gray-100">수량</span>
                    <span className="bg-gray-100 rounded-2xl">상품금액</span>
                </div>
            </div>
        </>
    );
};
