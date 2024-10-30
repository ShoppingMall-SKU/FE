import {useEffect, useState} from "react";

export const TotalCart = ({ total, setTotal, cart, convertPrice, found, sale, deps }) => {

    const [saled, setSale] = useState(0);
    const [sum, setSum] = useState(0);
    const [result, setResult] = useState(0);

    useEffect(() => {
        if (found) {
            const temp = found.filter((item) => item.length !== 0);
            setSum(temp.map((item) => item[0].price * item[0].quantity));
            setSale(temp.map((item) => Math.round(item[0].price * item[0].sale * 0.01) * item[0].quantity));

            if (sum.length === 0) {
                setTotal(0);
                return;
            }
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
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-7xl mb-12 h-50 lg:h-40 bg-gray-100 rounded-xl mx-auto mt-10 flex flex-col lg:flex-row gap-x-12 justify-center items-center justify-items-center">
            <div className="mt-5 lg:mt-0 flex flex-row items-center justify-center gap-x-6 lg:">
                <div className="text-center">
                    <p className="text-start leading-7 mb-3">총 상품금액</p>
                    <p className="text-2xl font-semibold text-black mb-5 lg:mb-0">{convertPrice(sum)}</p>
                </div>
                <div className="flex items-center justify-center relative w-9 h-9 rounded-full bg-white lg:mb-0">
                    <img src="/images/icon-minus-line.svg" alt="minus" className="flex size-5 rounded-full bg-white" />
                </div>
                <div>
                    <p className="mb-3 text-start text-black">상품 할인</p>
                    <p className="text-2xl font-semibold text-center mb-5 lg:mb-0">{convertPrice(saled)}원</p>
                </div>
                <div className=" flex relative w-9 h-9 rounded-full bg-white items-center justify-center">
                    <img src="/images/icon-plus-line.svg" alt="plus" className="flex size-5" />
                </div>
            </div>

            <div className="lg:mt-0">
                <p className="text-black mb-3">배송비</p>
                <p className="text-2xl mb-5 text-black text-center">0원</p>
            </div>

            <div className="ml-10 mt-5 lg:mt-0">
                <p className="font-bold leading-20 text-black mb-3">총 결제 예정 금액</p>
                <p className="text-4xl font-bold text-red-600">{convertPrice(sum - saled)}</p>
            </div>
            <div>
                <button className="mt-5 mb-5 lg:mt-0 lg:mb-0 btn btn-success h-10 w-28 text-white bg-green-500 rounded-xl" onClick={onClickPayment}>결제하기</button>
            </div>
        </div>
    );
};