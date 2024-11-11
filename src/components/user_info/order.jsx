

export const Order = ({order}) => {




    return (
        <div className='flex-col mx-auto card bg-gray-100 w-full mt-5 shadow-md'>
            <div className='flex-row card-body'>
                <p className='flex-row font-semibold text-xl'>{order.order_date} 주문</p>
                <div className='flex-row font-extrabold'>
                    {order.ship_status}
                </div>
            </div>
            <div className='flex ml-12 mb-10 gap-12 justify-between'>
                <div className='flex'>
                    <img className='w-20' src={order.img} alt='img'/>
                    <div className='pl-12 flex-row'>
                        <p className='font-bold text-lg'>{order.name}</p>
                        <p>{order.quantity} 개</p>
                        <p className='font-semibold'>{(order.total_price).toLocaleString()} 원</p>
                    </div>
                </div>
                <div className='flex pr-8'>
                    <div className='flex-col'>
                        <button className='flex mb-5 btn btn-outline'>
                            배송 조회
                        </button>
                        <button className='flex btn btn-outline'>
                            리뷰 작성
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}