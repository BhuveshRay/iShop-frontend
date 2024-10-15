import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../ContextHolder';
import axios from 'axios';

const Transaction = () => {
    const [transaction, setTransaction] = useState([])
    const [total, setTotal] = useState(0)
    const { BASE_URL } = useContext(Context)
    const [successFail, setSuccessFail] = useState({});

    function withoutFilter() {
        axios.get(process.env.REACT_APP_API_BASE_URL+"/transition"+"/get-transaction")
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setTransaction(success.data.transactions)
                    }
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    useEffect(
        () => {
            withoutFilter()
        }, []
    )

    let sum = 0;
    let success = 0;
    let failed = 0;
    useEffect(
        () => {
            if (transaction != "") {
                for (let d of transaction) {
                    sum += d.amount
                    if (d.payment_status === true) {
                        success++
                    } else if (d.payment_status === false) {
                        failed++
                    }
                }
                setTotal(sum)
                setSuccessFail({ success, failed });
            }
        }, [transaction]
    )

    function searchFilter(e) {
        e.preventDefault();
        axios.get(BASE_URL + "/transaction" + "/get-transaction?" + "order_id=" + e.target.order_id.value + "&transaction_id=" + e.target.transaction_id.value + "&payment_status=" + e.target.status.value + "&type=" + e.target.type.value + "&user_id=" + e.target.user_id.value + "&start_date=" + e.target.start.value + "&end_date=" + e.target.end.value)
            .then(
                (success) => {
                    setTransaction(success.data.transactions)
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )

    }
    
    return (
        <div className=''>
            {/* Filter of transaction */}
            <div className='bg-gray-200 p-3'>
                <div className='mb-3'>
                    <h3 className='text-xl font-semibold border-b-2 border-gray-400 inline'>Filter</h3>
                </div>
                <form onSubmit={searchFilter}>
                    <div date-rangepicker="" className="flex items-center">
                        <div>
                            <input
                                name="start"
                                type="date"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none select-none block w-full ps-2 p-2.5"
                                placeholder="Select date start"
                            />
                        </div>
                        <span className="mx-4 text-gray-500">to</span>
                        <div>
                            <input
                                name="end"
                                type="date"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none select-none block w-full ps-2 p-2.5"
                                placeholder="Select date end"
                            />
                        </div>
                    </div>

                    <div className='flex my-3 gap-2 w-full flex-wrap'>
                        <input type="text" name='order_id' className=' border p-2 border-gray-400 rounded laptop:w-[30%]' placeholder='Order ID' />
                        <input type="text" name='user_id' className=' border p-2 rounded border-gray-400 laptop:w-[30%]' placeholder='User ID' />
                        <input type="text" name='transaction_id' className=' border p-2 rounded border-gray-400 laptop:w-[30%]' placeholder='Transaction ID' />
                        <select name="status" className='w-40 p-2 rounded border border-gray-400 laptop:w-[30%]' id="status">
                            <option value="">Select Status</option>
                            <option value="true">Success</option>
                            <option value="false">Failed</option>
                        </select>
                        <select name="type" className='w-48 p-2 rounded border border-gray-400 laptop:w-[30%]' id="type">
                            <option value="">Select payment mode</option>
                            <option value="2">Online</option>
                            <option value="1">Cash</option>
                        </select>
                    </div>

                    <div className='flex gap-2'>
                        <button type='submit' className='w-40 text-center bg-blue-600 text-white py-1 rounded'>Search</button>
                        <button type='reset' onClick={withoutFilter} className='w-40 text-center bg-blue-600 text-white py-1 rounded'>Clear</button>
                    </div>
                </form>
            </div>
            {/* differents type of cards */}
            <div>
                <div className="cardBox">
                    <div className="card newCard">
                        <div>
                            <div className="numbers">{transaction?.length}</div>
                            <div className="cardName">Total transactions</div>
                        </div>
                        <div className="iconBx">
                            <ion-icon name="eye-outline" />
                        </div>
                    </div>
                    <div className="card newCard">
                        <div>
                            <div className="numbers">{successFail.success}</div>
                            <div className="cardName">Successful transactions</div>
                        </div>
                        <div className="iconBx">
                            <ion-icon name="cart-outline" />
                        </div>
                    </div>
                    <div className="card newCard">
                        <div>
                            <div className="numbers">{successFail.failed}</div>
                            <div className="cardName">Failed transactions</div>
                        </div>
                        <div className="iconBx">
                            <ion-icon name="chatbubbles-outline" />
                        </div>
                    </div>
                    <div className="card newCard">
                        <div>
                            <div className="numbers">₹{total.toLocaleString("en-IN")}</div>
                            <div className="cardName">Transaction amount</div>
                        </div>
                        <div className="iconBx">
                            <ion-icon name="cash-outline" />
                        </div>
                    </div>
                </div>
            </div>
            {/* transaction listing */}
            <div className='p-3 my-shadow m-5 rounded-xl overflow-y-auto overflow-x-auto'>
                <table className='w-full border border-black'>
                    <thead className='w-full ' >
                        <tr className='border border-gray-200'>
                            <th className='pb-3 border border-gray-200 '>Sr.no</th>
                            <th className='pb-3 border border-gray-200'>Order Info</th>
                            <th className='pb-3 border border-gray-200'>User Info</th>
                            <th className='pb-3 border border-gray-200'>Item type</th>
                            <th className='pb-3 border-border-gray-200'>Amount</th>
                            <th className='pb-3 border border-gray-200'>Status</th>
                            <th className='pb-3 border border-gray-200'>Payment mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transaction?.map(
                                (d, i) => {
                                  // console.log(d);
                                    return (
                                        <tr key={i} className={`text-center py-4 h-32 border`}>
                                            <td className='border border-gray-200'>{i + 1}</td>
                                            <td className='border border-gray-200'><b>Date:</b> {new Date(d?.createdAt).toLocaleString()} <br /> <b>Order Id:</b> {d?.order_id?._id} <br /> <b>Transaction Id:</b> {d?._id}</td>
                                            <td className='border border-gray-200'>
                                              {/* User info */}
                                              <span className='text-blue-500'>{d.user_id?.name}</span> <br /> {d.user_id?.email}</td>
                                            <td className='border border-gray-200'>
                                              {/* Item type */}
                                              {d?.order_id?.product_details?.map(
                                                (data, index) => {
                                                    return (
                                                        <span>
                                                            {data?.name}
                                                             <br />
                                                        </span>
                                                    )
                                                }
                                            )}</td>
                                            <td className='border border-gray-200'>Rs. <br /> {d.amount}</td>
                                            <td className='border border-gray-200'>{d.payment_status ? <span className='text-white px-1 rounded py-[2px] bg-green-500 text-sm'>Success</span> : <span className='text-white px-1 rounded py-[2px] bg-red-500 text-sm'>Failed</span>}</td>
                                            <td className='border border-gray-200'>{d.type === 1 ? "Cash" : "Online"}</td>
                                        </tr>
                                    )
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Transaction;
