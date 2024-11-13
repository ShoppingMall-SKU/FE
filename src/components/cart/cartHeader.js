export const CartHeader = ({ isAllChecked, handleCheckAll }) => {
    return (
        <>
            <header className="flex justify-center text-3xl lg:text-5xl font-semibold max-w-3xl mx-auto mt-8 md:mt-16">
                <h1>장바구니</h1>
            </header>
            <div className="lg:max-w-5xl w-11/12 xl:max-w-7xl mx-auto items-center">
                <div className="flex bg-gray-100 rounded-2xl mt-7 md:mt-12 h-16 justify-between items-center pl-7 pr-7 lg:pl-12 lg:pr-12">
                    <div className="">
                        <input
                            type="checkbox"
                            checked={isAllChecked}
                            onChange={(e) => handleCheckAll(e.target.checked)}
                            className="checkbox checkbox-success w-5 h-5 border-2 border-green-400 rounded-full appearance-none cursor-pointer [--chkbg:theme(colors.green.400)] [--chkfg:white] checked:border-none "
                        />
                    </div>
                    <span className="bg-gray-100">상품정보</span>
                    <span className="bg-gray-100">수량</span>
                    <span className="bg-gray-100 pl-12 rounded-2xl">상품금액</span>
                </div>
            </div>
        </>
    );
};
