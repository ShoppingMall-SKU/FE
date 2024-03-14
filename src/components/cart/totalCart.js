import { useEffect } from "react";

export const TotalCart = ({ total, setTotal, cart, convertPrice, found, effect, deps }) => {

    useEffect(() => {
        if (found) {
            const temp = found.filter((item) => item.length !== 0);
            const sum = temp.map((item) => item[0].price * item[0].quantity);
            const reducer = (acc, cur) => acc + cur;
            if (sum.length === 0) {
                setTotal(0);
                return;
            }
            const itemTotal = sum.reduce(reducer);
            setTotal(itemTotal);
        } else {
            setTotal(0);
        }
    }, [cart, total, found, setTotal]);

    const onClickPayment = () => {
        const {IMP} = window;
        IMP.init('imp07817434');

        const data = {
            pg: 'nice_v2',
            pay_method: 'card',
            merchant_uid: `mid_${new Date().getTime()}`,
            name: '결제 테스트',
            amount: '100',
            custom_data: {
                name: '부가정보',
                desc: '세부 부가정보',
            },
            buyer_name: '홍길동',
            buyer_tel: '01012345678',
            buyer_email: '14279625@gmail.com',
            buyer_addr: '구천면로 000-00',
            buyer_postalcode: '01234',
        };

        IMP.request_pay(data, callback);
    };

    const callback = response => {
        const {success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status} = response;

        if (success) {
            alert('결제 성공');
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    };


    return (
        <div className="max-w-4xl xl:max-w-7xl mb-12 h-40 bg-gray-100 rounded-xl mx-auto mt-10 grid grid-cols-7 items-center justify-items-center">
            <div className="text-center">
                <p className=" text-black mb-3">총 상품금액</p>
                <p className="text-2xl text-black">{convertPrice(total)}</p>
            </div>
            <div className="relative w-9 h-9 rounded-full bg-white">
                <img src="/images/icon-minus-line.svg" alt="minus" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white" />
            </div>
            <div>
                <p className="mb-3 text-black">상품 할인</p>
                <p className="text-2xl text-black">0원</p>
            </div>
            <div className="relative w-9 h-9 rounded-full bg-white">
                <img src="/images/icon-plus-line.svg" alt="plus" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white" />
            </div>
            <div>
                <p className="text-black mb-3">배송비</p>
                <p className="text-2xl text-black">0원</p>
            </div>
            <div>
                <p className="font-bold leading-20 text-black mb-3">결제 예정 금액</p>
                <p className="text-4xl font-bold text-red-600">{convertPrice(total)}</p>
            </div>
            <div>
                <button className="h-10 w-28 text-white bg-green-500 rounded-xl" onClick={onClickPayment}>결제하기</button>
            </div>
        </div>
    );
};