

export const Order = ({order}) => {




    return (
        <div className='flex-col mx-auto card bg-gray-100 w-full mb-4 md:mt-5 shadow-md'>
            <div className='flex p-5 md:p-10 md:flex-row card-body'>
                <p className='flex-row font-semibold text-lg md:text-xl'>{order.order_date} 주문</p>
                <div className='flex-row font-extrabold'>
                    {order.ship_status}
                </div>
            </div>
            <div className='flex-row md:flex ml-5 md:ml-12 mb-5 md:mb-10 gap-12 justify-between'>
                <div className='flex'>
                    <img className='w-20 md:w-32' src={order.img} alt='img'/>
                    <div className='text-md pl-6 md:pl-12 flex-row'>
                        <p className='font-bold text-lg'>{order.name}</p>
                        <p>{order.quantity} 개</p>
                        <p className='font-semibold'>{(order.total_price).toLocaleString()} 원</p>
                    </div>
                </div>
                <div className='flex pr-8'>
                    <div className='flex ml-7 justify-center items-center md:flex-col md:ml-2 mt-5 md:mt-0'>
                        <button className='flex-row bg-gray-200 border-0 md:flex mr-5 md:mr-0 md:mb-5 btn btn-sm md:btn-md shadow-black'>
                            배송 조회
                        </button>
                        <button className='flex-row bg-gray-200 border-0 md:flex mr-5 md:mr-0 md:mb-5 btn btn-sm md:btn-md shadow-black'>
                            리뷰 작성
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}