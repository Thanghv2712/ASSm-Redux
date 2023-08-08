import  Box  from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decrease, increase } from "../slices/cart";
import { useAppDispatch, useAppSelector } from "../store/hook";


const Cart = () => {
    const dispatch = useAppDispatch();
    const { cartItems } = useAppSelector((state) => state.cart);
  return (
    
    <section className="flex items-center font-poppins dark:bg-gray-700 ">
    <div className="justify-center flex-1 px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
        <div className="p-8 bg-gray-50 dark:bg-gray-800">
            <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">Giỏ hàng của bạn</h2>
            <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4 mb-8 xl:w-8/12 xl:mb-0">
                    <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                        <div className="w-full md:block hidden px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                            <h2 className="font-bold text-gray-500 dark:text-gray-400">Tên sản phẩm</h2>
                        </div>
                        <div className="hidden px-4 lg:block lg:w-2/12">
                            <h2 className="font-bold text-gray-500 dark:text-gray-400">Giá</h2>
                        </div>
                        <div className="hidden md:block px-4 md:w-1/6 lg:w-2/12 ">
                            <h2 className="font-bold text-gray-500 dark:text-gray-400">Số lượng</h2>
                        </div>
                        <div className="hidden md:block px-4 text-right md:w-1/6 lg:w-2/12 ">
                            <h2 className="font-bold text-gray-500 dark:text-gray-400"> Tổng</h2>
                        </div>
                    </div>
                    <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                                <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                                    <div className="flex flex-wrap items-center -mx-4">
                                        <div className="w-full px-4 mb-3 md:w-1/3">
                                            <div className="w-full h-96 md:h-24 md:w-24">
                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-2/3 px-4">
                                            <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                                                {item.name.slice(0, 20)}...
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden px-4 lg:block lg:w-2/12">
                                    <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                                        {item.price}
                                    </p>
                                </div>
                                <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                                    <Box className="gap-2 inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700 ">
                                        <RemoveIcon onClick={() => dispatch(decrease(item.id))} />

                                        <p>{item.quantity}</p>

                                        <AddIcon onClick={() => dispatch(increase(item.id))} />
                                    </Box>
                                </div>
                                <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                                    <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                                        {item.price * item?.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="text-gray-700 dark:text-gray-400">Mã giảm giá (nếu có)</span>
                        <input
                            type="text"
                            className="flex-1 px-8 py-4 font-normal placeholder-gray-300 border dark:border-gray-700 dark:placeholder-gray-500 md:flex-none md:mr-6 dark:text-gray-400 dark:bg-gray-800"
                            placeholder="x304k45"
                        />
                        <button className="flex-1 inline-block px-8 py-4 font-bold text-center text-gray-100 bg-blue-500 rounded-md hover:bg-blue-600 md:flex-none">
                            Áp dụng
                        </button>
                    </div>
                </div>
                <div className="w-full px-4 xl:w-4/12">
                    <div className="p-6 border border-blue-100 dark:bg-gray-900 dark:border-gray-900 bg-blue-50 md:p-8">
                        <h2 className="mb-8 text-3xl font-bold text-gray-700 dark:text-gray-400">
                            Phương thức thanh toán
                        </h2>
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300 dark:border-gray-700 ">
                            <span className="text-gray-700 dark:text-gray-400">Tổng</span>
                            <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
                                {/* {cartItems.reduce((sum: number, item: any) => {
                                    return sum + item.price * item.quantity;
                                }, 0)} */}
                            </span>
                        </div>
                        <div className="flex items-center justify-between pb-4 mb-4 ">
                            <span className="text-gray-700 dark:text-gray-400 ">Shipping</span>
                            <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">Free</span>
                        </div>

                        <h2 className="text-lg text-gray-500 dark:text-gray-400">Khuyên dùng:</h2>
                        <div className="flex items-center mb-4 ">
                            <a href="#">
                                <img
                                    src="https://i.postimg.cc/g22HQhX0/70599-visa-curved-icon.png"
                                    alt=""
                                    className="object-cover h-16 mr-2 w-26"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="https://i.postimg.cc/HW38JkkG/38602-mastercard-curved-icon.png"
                                    alt=""
                                    className="object-cover h-16 mr-2 w-26"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="https://i.postimg.cc/HL57j0V3/38605-paypal-straight-icon.png"
                                    alt=""
                                    className="object-cover h-16 mr-2 w-26"
                                />
                            </a>
                        </div>
                        <div className="flex items-center justify-between ">
                            {/* <Button
                                loading={loading}
                                onClick={handleCheckout}
                                className="block w-full py-4 font-bold text-center text-gray-100 uppercase bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                                Checkout
                            </Button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Cart