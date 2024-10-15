import React, { useContext, useEffect } from 'react';
import { Context } from '../../ContextHolder';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { lsToCurrentState } from '../../reducers/AdminSlice';

const Orders = () => {
    const { orders} = useContext(Context);
    // const admin = useSelector(store => store.admin);
    const navigator = useNavigate();
    const dispatcher = useDispatch();

    useEffect(
        () => {
            dispatcher(lsToCurrentState());

            const lsAdmin = localStorage.getItem("admin");
            if (!lsAdmin) {
                navigator("/admin/sign-in")
            }
        }, []
    )


    return (
        <div>
            <div className=" overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="border border-gray-200 px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="border border-gray-200 px-6 py-3">
                                Order Id
                            </th>
                            <th scope="col" className="border border-gray-200 px-6 py-3">
                                Product Name & Qty
                            </th>
                            <th scope="col" className="border border-gray-200 px-6 py-3">
                                Customer Details
                            </th>
                            <th scope="col" className="border border-gray-200 px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="border border-gray-200 px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="border border-gray-200 px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map(
                                (order, i) => {
                                    return <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="p-2 text-center">{i + 1}</td>
                                        <th
                                            scope="row"
                                            className="p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white border border-gray-200"
                                        >
                                            {order._id}
                                        </th>
                                        <td className="p-2">
                                            {
                                                order?.product_details.map(
                                                    (prod, i) => {
                                                        return <div key={i} className='flex gap-3 capitalizeborder border-gray-200 justify-center items-center'>
                                                            {prod.name} 
                                                            <div className='font-semibold'>{prod.qty} </div >
                                                        </div>
                                                        
                                                    }
                                                )
                                            }
                                        </td>
                                        <td className="p-2 capitalize border border-gray-200">
                                            <b> name :</b> {order.shipping_details.name}
                                            <br />
                                            <b>adress :</b> {order.shipping_details.address}
                                        </td>
                                        <td className="w-[10%] p-2 border border-gray-200">{new Date(order.createdAt).toLocaleString()}</td>
                                        <td className="p-2 border border-gray-200">₹{(order.order_total)}</td>
                                        <td className="p-2border border-gray-200 ">

                                            {
                                                order.order_status === 0 ? <span className='border-2 p-2 rounded-full border-orange-600 text-orange-600'>Pending</span> : order.order_status === 1 ? <span className='border-2 p-2 rounded-full border-green-600 text-green-600'>Success</span> : ""
                                            }
                                        </td>
                                    </tr>
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default Orders;

