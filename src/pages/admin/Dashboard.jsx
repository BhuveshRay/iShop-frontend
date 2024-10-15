import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../ContextHolder';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { lsToCurrentState } from '../../reducers/AdminSlice';
import { Chart as ChartJS } from 'chart.js/auto'; // important don't remove this
import { Bar, Pie } from 'react-chartjs-2';
import { FaRegUser } from "react-icons/fa";

const Dashboard = () => {
    const { users,  apiOrderBaseUrl} = useContext(Context)
    const admin = useSelector(store => store.admin);
    const dispatcher = useDispatch();
    const navigator = useNavigate();

    const [transaction, setTransaction] = useState([])
    const [orders, setOrder] = useState([]);

    orders.reverse();

    const [orderChart, setOrderChart] = useState({
        labels: orders.map((d, i) => i + 1),
        datasets: [{
            label: "Order total",
            data: orders.map((d) => d.order_total)
        }]
    })

    const chartOptions = {
        scales: {
            x: {
                type: 'category',
                min: 1, // Set the minimum limit for the x-axis
                max: 10, // Set the maximum limit for the x-axis
                labels: orders.map((d, i) => i + 1)
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    const [transChart, setTransChart] = useState({
        labels: ["Total Transaction", "Success Trancation", "Failed Transaction"],
        datasets: [{
            label: "Order total",
            data: [1, 2, 3]
        }]
    })

    let a = 0;

    useEffect(
        () => {
            if (orders.length != 0) {
                setOrderChart({
                    labels: orders.map((d, i) => i + 1),
                    datasets: [{
                        label: "Success order",
                        data: orders.map((d) => d.order_total),
                        backgroundColor: orders.map((d) => d.order_status == 1 ? "red" : "green")
                    }]
                })
            }
        }, [orders]
    )

    useEffect(
        () => {
            if (transaction.length != 0) {
                setTransChart({
                    labels: ["Total Transaction", "Success Trancation", "Failed Transaction"],
                    datasets: [{
                        label: "Order total",
                        data: [transaction.length, successCount, transaction.length - successCount],
                        backgroundColor: ["blue", "green", "red"]
                    }]
                })
            }
        }, [transaction]
    )

    useEffect(
        () => {
            const lsAdmin = localStorage.getItem("admin");
            if (!lsAdmin) {
                navigator("sign-in")
            };
            dispatcher(lsToCurrentState());
            allTransaction();
        }, []
    )

    useEffect(
        allOrders, [admin]
    )

    function allTransaction() {
        axios.get(process.env.REACT_APP_API_BASE_URL+"/transition"+"/get-transaction")
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        setTransaction(success.data.transactions)
                    }
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )
    }

    
    function allOrders() {
        axios.get(apiOrderBaseUrl + "/order-data", {
            headers: {
                Authorization: admin.token
            }
        })
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        setOrder(success.data.amdinOrders);
                    }
                }
            ).catch(
                (error) => {

                }
            )
    }

    let ordersCount = 0;
    for (let j of orders) {
        ordersCount++
    }

    let transactionCount = 0;
    let totalSuccessPayment = 0;
    let successCount = 0;
    for (let j of transaction) {
        transactionCount++
        if (j.payment_status === true) {
            totalSuccessPayment += j.amount;
            successCount++;
        }
    }


    const [newOrders, setNewOrders] = useState([]);
    useEffect(
        ()=>{
            if(orders){
                setNewOrders(orders.reverse())
            }
        }, [orders]
    )

    return (
        <div className='mb-14 '>
            <div className="container">
                <div className="main w-full ">
                    {/* ======================= Cards ================== */}
                    <div className="cardBox">
                        <div className="card">
                            <div>
                                <div className="numbers">
                                    {ordersCount}
                                    </div>
                                <div className="cardName">Total Orders</div>
                            </div>
                            <div className="iconBx">
                                <ion-icon name="eye-outline" />
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <div className="numbers">
                                { transactionCount}</div>
                                <div className="cardName">Total Transactions</div>
                            </div>
                            <div className="iconBx">
                                <ion-icon name="cart-outline" />
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <div className="numbers">{users.length}</div>
                                <div className="cardName">Total Users</div>
                            </div>
                            <div className="iconBx">
                                <ion-icon name="chatbubbles-outline" />
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <div className="numbers">₹{(totalSuccessPayment)}</div>
                                <div className="cardName">Total Earning</div>
                            </div>
                            <div className="iconBx">
                                <ion-icon name="cash-outline" />
                            </div>
                        </div>
                    </div>
                    {/* Orders and Transaction */}
                    <div className='ms-6 flex gap-5'>
                        <div className='w-[48%] my-shadow rounded-xl p-6'>
                            <div className="cardHeader mb-8">
                                <h2>Recent Order</h2>
                            </div>
                            <Bar data={orderChart} options={chartOptions} />
                        </div>
                        <div className='w-[48%] my-shadow rounded-xl p-6'>
                            <div className="cardHeader mb-8">
                                <h2>Recent Transaction</h2>
                            </div>
                            <div className='w-full flex justify-center'>
                                <div className='w-[300px] h-[300px]'>
                                    <Pie data={transChart} width="100%" height="100%" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ================ Order Details List ================= */}
                    <div className="details">
                        <div className="recentOrders p-2.5rem md:p-5">
                            <div className="cardHeader">
                                <h2>Recent Products</h2>
                                <Link to="/admin/order" className="btn">
                                    View All
                                </Link>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Price</td>
                                        <td>Payment</td>
                                        <td>Status</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map(
                                            (o, i) => {
                                                return o.product_details.map(
                                                    (p, j) => {
                                                        a++
                                                        return (a <= 15 ? <> <tr key={j}>
                                                            <td className='capitalize'>{p.name}</td>
                                                            <td>₹{(p.total)}</td>
                                                            <td>{o.order_status === 1 ? "Paid" : "Due"}</td>
                                                            <td>
                                                                <span className={`status ${o.order_status === 1 ? "delivered" : "pending"}`}>{o.order_status === 1 ? "Dispatch" : "Pending"}</span>
                                                            </td>
                                                        </tr> </> : ""
                                                        )
                                                    }
                                                )

                                            }
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        {/* ================= New Customers ================ */}
                        <div className="recentCustomers p-2.5rem md:p-5">
                            <div className="cardHeader">
                                <h2>Recent Customers</h2>
                            </div>
                            <table >
                            <tbody>
                                    {
                                        users.map(
                                            (u, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td width="60px">
                                                            <div className="imgBx flex justify-center items-center border rounded-full">
                                                                <FaRegUser />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <h4>
                                                                {u.name} <br /> <span>{u.email}</span>
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
     </div>
    );
}

export default Dashboard;
