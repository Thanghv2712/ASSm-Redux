import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../api/product';
import { useAppDispatch } from '../store/hook';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { add } from '../slices/cart';
import { Button } from '@mui/material';

const ProductDetail = () => {
    const { id } = useParams();
    const dispath = useAppDispatch();

    const { data: product} = useGetProductByIdQuery(id || '');


    return (
        <section className="py-10 font-poppins dark:bg-gray-800">
            <div className="max-w-6xl px-4 mx-auto">
                <div className="flex flex-wrap mb-24 -mx-4">
                    <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                        <div className="sticky top-0 overflow-hidden ">
                            <div className="relative mb-6 lg:mb-10 lg:h-96">
                                <img
                                    className="object-contain w-full lg:h-full"
                                    src={product?.image}
                                    alt={product?.name}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2">
                        <div className="lg:pl-20">
                            <div className="mb-6 ">
                                <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                    New Arrival
                                </span>
                                <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                    {product?.name}
                                </h2>
                                <div className="flex flex-wrap items-center mb-6">
                                    <ul className="flex mb-4 mr-2 lg:mb-0">
                                        <li>
                                            <StarBorderIcon />
                                        </li>
                                        <li>
                                            <StarBorderIcon />
                                        </li>
                                        <li>
                                            <StarBorderIcon />
                                        </li>
                                        <li>
                                            <StarBorderIcon />
                                        </li>
                                      
                                    </ul>
                                </div>
                                <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                    <span>{product?.price}</span>
                                </p>
                            </div>

                            <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                                <span className="text-base text-gray-600 dark:text-gray-400">In Stock</span>
                                <p className="mt-2 text-sm text-blue-500 dark:text-blue-200">
                                    Ship toàn quốc.
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Hầu hết khách hàng nhận được hàng trong vòng 3-31 ngày.
                                    </span>
                                </p>
                            </div>
                            <div className="mb-6 "></div>
                            <div className="flex flex-wrap items-center mb-6">
                                <Button onClick={() => dispath(add({ ...product, quantity: 1  }))}>Add to cart</Button>
                            </div>
                            <div className="flex gap-4 mb-6">
                                <a
                                    href="#"
                                    className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                                >
                                    Buy now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
