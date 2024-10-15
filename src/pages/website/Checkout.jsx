import React, { useContext, useEffect, useRef, useState } from 'react';
import Container from '../../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Context } from '../../ContextHolder';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from '../../reducers/CartSlice';
import useRazorpay from "react-razorpay";


export default function Checkout() {
    const [Razorpay] = useRazorpay();
    const { notify, apiUserBaseUrl, apiOrderBaseUrl } = useContext(Context);
    const { data: userData } = useSelector(store => store.user);
    const [address, setAddress] = useState([]);
    const { total } = useSelector(store => store.cart);
    const [payment_mode, setPaymentMode] = useState(0);
    const checkoutForm = useRef();
    // 0 -> online delivery(RazorPay). 1 -> Pay on delivery 
    const navigator = useNavigate();
    const dispatcher = useDispatch();
    useEffect(
        () => {
            getUserAddress(userData?._id)
        }, [userData]
    )

    const getUserAddress = (user_id) => {
        axios.get(apiUserBaseUrl + "/get-user-address/" + user_id)
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        setAddress(success.data.userAddress);
                        //   notify(success.data.msg, "success");
                    }
                }
            ).catch(
                (error) => {
                    notify(error, "error");
                }
            )
    }

    function getProcessingFee(flag) {
        if (flag === 1) {
            return 50
        } else {
            return 0
        }
    }

    const placeOrder = () => {
        const data = {
            user_id: userData._id,
            payment_mode,
            shipping_details: {
                name: checkoutForm.current.name.value,
                email: checkoutForm.current.email.value,
                contact: checkoutForm.current.contact.value,
                address: checkoutForm.current.address.value,
                pincode: checkoutForm.current.pincode.value,
                state: checkoutForm.current.state.value,
                city: checkoutForm.current.city.value
            },
        }
        axios.post(apiOrderBaseUrl + "/create", data)
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        if (payment_mode === 1) { // if POD
                            //thank you
                            dispatcher(emptyCart());
                            navigator(`/order-place-thank-you/${success.data.order_id}`);
                        } else { // if online payment
                            // Payment popup
                            initRazorpay(success.data.order, success.data.razorpay_order);
                        }
                    } else {

                    }
                }
            ).catch(
                (error) => {

                }
            )
    }

    const initRazorpay = (order, razorpay_order) => {
        const options = {
            key: process.env.REACT_API_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
            amount: order.order_total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "IShop",
            description: "Payment for order:" + order._id,
            image: "http://localhost:3000/images/logo.svg",
            order_id: razorpay_order.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
                axios.post(process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_ORDER_PLACE_URL + "/payment-success",
                    {
                        ...response,
                        order_id: order._id,
                        user_id: userData._id,
                        amount: order.order_total
                    }
                ).then(
                    (success) => {
                        if(success.data.status === 1){
                            dispatcher(emptyCart());
                        navigator(`/order-place-thank-you/${success.data.order_id}`);
                        }else{
                            console.log(success.data);
                        }
                    }
                ).catch(
                    (err) => {
                        // console.log(err)
                    }
                )
            },
            prefill: {
                name: userData?.name,
                email: userData?.email,
                contact: userData?.contact,
            },
            theme: {
                color: "#ff4252",
            },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            console.log(response);
        });

        rzp1.open();
    }

    const addAddress = () => {
        const data = {
            name: checkoutForm.current.name.value,
            email: checkoutForm.current.email.value,
            contact: checkoutForm.current.contact.value,
            address: checkoutForm.current.address.value,
            pincode: checkoutForm.current.pincode.value,
            state: checkoutForm.current.state.value,
            city: checkoutForm.current.city.value
        }
        axios.post(apiUserBaseUrl + "/add-address/" + userData?._id, data)
            .then(
                (success) => {
                    notify(success.data.msg, success.data.status);
                }
            ).catch(
                (error) => {
                    notify(error, "error");
                }
            )
    }
    return (
        <Container>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <form ref={checkoutForm} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Delivery Detail
                                </h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="your_name"
                                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            {" "}
                                            Your name{" "}
                                        </label>
                                        <input
                                            defaultValue={address[0]?.name}
                                            type="text"
                                            id="your_name"
                                            name='name'
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                            placeholder="Bonnie Green"
                                            required=""
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="your_email"
                                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            {" "}
                                            Your email*{" "}
                                        </label>
                                        <input
                                            defaultValue={address[0]?.email}
                                            type="email"
                                            id="your_email"
                                            name='email'
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                            placeholder="name@flowbite.com"
                                            required=""
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phone-input-3"
                                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            {" "}
                                            Phone Number*{" "}
                                        </label>
                                        <div className="flex items-center">
                                            <button
                                                defaultValue={address[0]?.contcat_number}
                                                id="dropdown-phone-button-3"
                                                data-dropdown-toggle="dropdown-phone-3"
                                                className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                                type="button"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 640 480"
                                                >
                                                    <g fillRule="evenodd">
                                                        <path fill="#ff9933" d="M0 0h640v160H0z" />
                                                        <path fill="#fff" d="M0 160h640v160H0z" />
                                                        <path fill="#128807" d="M0 320h640v160H0z" />
                                                    </g>
                                                    <circle
                                                        cx="320"
                                                        cy="240"
                                                        r="60"
                                                        fill="#000080"
                                                        stroke="#000080"
                                                        strokeWidth="0"
                                                    />
                                                    <g
                                                        fill="none"
                                                        stroke="#000080"
                                                        strokeWidth="4"
                                                        transform="translate(320 240)"
                                                    >
                                                        <circle r="60" />
                                                        <g id="d">
                                                            <g id="c">
                                                                <g id="b">
                                                                    <g id="a" transform="rotate(7.5)">
                                                                        <line x2="60" />
                                                                        <path d="M0 0L60 10a60 60 0 01-30 10 60 60 0 01-30-10" />
                                                                    </g>
                                                                    <use transform="rotate(15)" xlinkHref="#a" />
                                                                </g>
                                                                <use transform="rotate(30)" xlinkHref="#b" />
                                                            </g>
                                                            <use transform="rotate(60)" xlinkHref="#c" />
                                                        </g>
                                                        <use transform="rotate(120)" xlinkHref="#d" />
                                                        <use transform="rotate(240)" xlinkHref="#d" />
                                                    </g>
                                                </svg>
                                                +91
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="m19 9-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                            <div
                                                id="dropdown-phone-3"
                                                className="z-10 hidden w-56 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                                            >
                                                <ul
                                                    className="p-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                                                    aria-labelledby="dropdown-phone-button-2"
                                                >
                                                    <li>
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            role="menuitem"
                                                        >
                                                            <span className="inline-flex items-center">
                                                                <svg
                                                                    fill="none"
                                                                    aria-hidden="true"
                                                                    className="me-2 h-4 w-4"
                                                                    viewBox="0 0 20 15"
                                                                >
                                                                    <rect
                                                                        width="19.6"
                                                                        height={14}
                                                                        y=".5"
                                                                        fill="#fff"
                                                                        rx={2}
                                                                    />
                                                                    <mask
                                                                        id="a"
                                                                        style={{ maskType: "luminance" }}
                                                                        width={20}
                                                                        height={15}
                                                                        x={0}
                                                                        y={0}
                                                                        maskUnits="userSpaceOnUse"
                                                                    >
                                                                        <rect
                                                                            width="19.6"
                                                                            height={14}
                                                                            y=".5"
                                                                            fill="#fff"
                                                                            rx={2}
                                                                        />
                                                                    </mask>
                                                                    <g mask="url(#a)">
                                                                        <path
                                                                            fill="#D02F44"
                                                                            fillRule="evenodd"
                                                                            d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                        <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                                                                        <g filter="url(#filter0_d_343_121520)">
                                                                            <path
                                                                                fill="url(#paint0_linear_343_121520)"
                                                                                fillRule="evenodd"
                                                                                d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </g>
                                                                    </g>
                                                                    <defs>
                                                                        <linearGradient
                                                                            id="paint0_linear_343_121520"
                                                                            x1=".933"
                                                                            x2=".933"
                                                                            y1="1.433"
                                                                            y2="6.1"
                                                                            gradientUnits="userSpaceOnUse"
                                                                        >
                                                                            <stop stopColor="#fff" />
                                                                            <stop offset={1} stopColor="#F0F0F0" />
                                                                        </linearGradient>
                                                                        <filter
                                                                            id="filter0_d_343_121520"
                                                                            width="6.533"
                                                                            height="5.667"
                                                                            x=".933"
                                                                            y="1.433"
                                                                            colorInterpolationFilters="sRGB"
                                                                            filterUnits="userSpaceOnUse"
                                                                        >
                                                                            <feFlood
                                                                                floodOpacity={0}
                                                                                result="BackgroundImageFix"
                                                                            />
                                                                            <feColorMatrix
                                                                                in="SourceAlpha"
                                                                                result="hardAlpha"
                                                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                            />
                                                                            <feOffset dy={1} />
                                                                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                                            <feBlend
                                                                                in2="BackgroundImageFix"
                                                                                result="effect1_dropShadow_343_121520"
                                                                            />
                                                                            <feBlend
                                                                                in="SourceGraphic"
                                                                                in2="effect1_dropShadow_343_121520"
                                                                                result="shape"
                                                                            />
                                                                        </filter>
                                                                    </defs>
                                                                </svg>
                                                                United States (+1)
                                                            </span>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            role="menuitem"
                                                        >
                                                            <span className="inline-flex items-center">
                                                                <svg
                                                                    className="me-2 h-4 w-4"
                                                                    fill="none"
                                                                    viewBox="0 0 20 15"
                                                                >
                                                                    <rect
                                                                        width="19.6"
                                                                        height={14}
                                                                        y=".5"
                                                                        fill="#fff"
                                                                        rx={2}
                                                                    />
                                                                    <mask
                                                                        id="a"
                                                                        style={{ maskType: "luminance" }}
                                                                        width={20}
                                                                        height={15}
                                                                        x={0}
                                                                        y={0}
                                                                        maskUnits="userSpaceOnUse"
                                                                    >
                                                                        <rect
                                                                            width="19.6"
                                                                            height={14}
                                                                            y=".5"
                                                                            fill="#fff"
                                                                            rx={2}
                                                                        />
                                                                    </mask>
                                                                    <g mask="url(#a)">
                                                                        <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                                                                        <path
                                                                            fill="#fff"
                                                                            fillRule="evenodd"
                                                                            d="M-.898-.842L7.467 4.8V-.433h4.667V4.8l8.364-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.043-1.548 6.613-4.46H0V5.166h4.672L-1.941.706-.898-.842z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                        <path
                                                                            stroke="#DB1F35"
                                                                            strokeLinecap="round"
                                                                            strokeWidth=".667"
                                                                            d="M13.067 4.933L21.933-.9M14.009 10.088l7.947 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.189 6.093"
                                                                        />
                                                                        <path
                                                                            fill="#E6273E"
                                                                            fillRule="evenodd"
                                                                            d="M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </g>
                                                                </svg>
                                                                United Kingdom (+44)
                                                            </span>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            role="menuitem"
                                                        >
                                                            <span className="inline-flex items-center">
                                                                <svg
                                                                    className="me-2 h-4 w-4"
                                                                    fill="none"
                                                                    viewBox="0 0 20 15"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <rect
                                                                        width="19.6"
                                                                        height={14}
                                                                        y=".5"
                                                                        fill="#fff"
                                                                        rx={2}
                                                                    />
                                                                    <mask
                                                                        id="a"
                                                                        style={{ maskType: "luminance" }}
                                                                        width={20}
                                                                        height={15}
                                                                        x={0}
                                                                        y={0}
                                                                        maskUnits="userSpaceOnUse"
                                                                    >
                                                                        <rect
                                                                            width="19.6"
                                                                            height={14}
                                                                            y=".5"
                                                                            fill="#fff"
                                                                            rx={2}
                                                                        />
                                                                    </mask>
                                                                    <g mask="url(#a)">
                                                                        <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
                                                                        <path
                                                                            fill="#fff"
                                                                            stroke="#fff"
                                                                            strokeWidth=".667"
                                                                            d="M0 .167h-.901l.684.586 3.15 2.7v.609L-.194 6.295l-.14.1v1.24l.51-.319L3.83 5.033h.73L7.7 7.276a.488.488 0 00.601-.767L5.467 4.08v-.608l2.987-2.134a.667.667 0 00.28-.543V-.1l-.51.318L4.57 2.5h-.73L.66.229.572.167H0z"
                                                                        />
                                                                        <path
                                                                            fill="url(#paint0_linear_374_135177)"
                                                                            fillRule="evenodd"
                                                                            d="M0 2.833V4.7h3.267v2.133c0 .369.298.667.666.667h.534a.667.667 0 00.666-.667V4.7H8.2a.667.667 0 00.667-.667V3.5a.667.667 0 00-.667-.667H5.133V.5H3.267v2.333H0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                        <path
                                                                            fill="url(#paint1_linear_374_135177)"
                                                                            fillRule="evenodd"
                                                                            d="M0 3.3h3.733V.5h.934v2.8H8.4v.933H4.667v2.8h-.934v-2.8H0V3.3z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                        <path
                                                                            fill="#fff"
                                                                            fillRule="evenodd"
                                                                            d="M4.2 11.933l-.823.433.157-.916-.666-.65.92-.133.412-.834.411.834.92.134-.665.649.157.916-.823-.433zm9.8.7l-.66.194.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.194zm0-8.866l-.66.193.194-.66-.194-.66.66.193.66-.193-.193.66.193.66-.66-.193zm2.8 2.8l-.66.193.193-.66-.193-.66.66.193.66-.193-.193.66.193.66-.66-.193zm-5.6.933l-.66.193.193-.66-.193-.66.66.194.66-.194-.193.66.193.66-.66-.193zm4.2 1.167l-.33.096.096-.33-.096-.33.33.097.33-.097-.097.33.097.33-.33-.096z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </g>
                                                                    <defs>
                                                                        <linearGradient
                                                                            id="paint0_linear_374_135177"
                                                                            x1={0}
                                                                            x2={0}
                                                                            y1=".5"
                                                                            y2="7.5"
                                                                            gradientUnits="userSpaceOnUse"
                                                                        >
                                                                            <stop stopColor="#fff" />
                                                                            <stop offset={1} stopColor="#F0F0F0" />
                                                                        </linearGradient>
                                                                        <linearGradient
                                                                            id="paint1_linear_374_135177"
                                                                            x1={0}
                                                                            x2={0}
                                                                            y1=".5"
                                                                            y2="7.033"
                                                                            gradientUnits="userSpaceOnUse"
                                                                        >
                                                                            <stop stopColor="#FF2E3B" />
                                                                            <stop offset={1} stopColor="#FC0D1B" />
                                                                        </linearGradient>
                                                                    </defs>
                                                                </svg>
                                                                Australia (+61)
                                                            </span>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            role="menuitem"
                                                        >
                                                            <span className="inline-flex items-center">
                                                                <svg
                                                                    className="me-2 h-4 w-4"
                                                                    fill="none"
                                                                    viewBox="0 0 20 15"
                                                                >
                                                                    <rect
                                                                        width="19.6"
                                                                        height={14}
                                                                        y=".5"
                                                                        fill="#fff"
                                                                        rx={2}
                                                                    />
                                                                    <mask
                                                                        id="a"
                                                                        style={{ maskType: "luminance" }}
                                                                        width={20}
                                                                        height={15}
                                                                        x={0}
                                                                        y={0}
                                                                        maskUnits="userSpaceOnUse"
                                                                    >
                                                                        <rect
                                                                            width="19.6"
                                                                            height={14}
                                                                            y=".5"
                                                                            fill="#fff"
                                                                            rx={2}
                                                                        />
                                                                    </mask>
                                                                    <g mask="url(#a)">
                                                                        <path
                                                                            fill="#262626"
                                                                            fillRule="evenodd"
                                                                            d="M0 5.167h19.6V.5H0v4.667z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                        <g filter="url(#filter0_d_374_135180)">
                                                                            <path
                                                                                fill="#F01515"
                                                                                fillRule="evenodd"
                                                                                d="M0 9.833h19.6V5.167H0v4.666z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </g>
                                                                        <g filter="url(#filter1_d_374_135180)">
                                                                            <path
                                                                                fill="#FFD521"
                                                                                fillRule="evenodd"
                                                                                d="M0 14.5h19.6V9.833H0V14.5z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </g>
                                                                    </g>
                                                                    <defs>
                                                                        <filter
                                                                            id="filter0_d_374_135180"
                                                                            width="19.6"
                                                                            height="4.667"
                                                                            x={0}
                                                                            y="5.167"
                                                                            colorInterpolationFilters="sRGB"
                                                                            filterUnits="userSpaceOnUse"
                                                                        >
                                                                            <feFlood
                                                                                floodOpacity={0}
                                                                                result="BackgroundImageFix"
                                                                            />
                                                                            <feColorMatrix
                                                                                in="SourceAlpha"
                                                                                result="hardAlpha"
                                                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                            />
                                                                            <feOffset />
                                                                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                                            <feBlend
                                                                                in2="BackgroundImageFix"
                                                                                result="effect1_dropShadow_374_135180"
                                                                            />
                                                                            <feBlend
                                                                                in="SourceGraphic"
                                                                                in2="effect1_dropShadow_374_135180"
                                                                                result="shape"
                                                                            />
                                                                        </filter>
                                                                        <filter
                                                                            id="filter1_d_374_135180"
                                                                            width="19.6"
                                                                            height="4.667"
                                                                            x={0}
                                                                            y="9.833"
                                                                            colorInterpolationFilters="sRGB"
                                                                            filterUnits="userSpaceOnUse"
                                                                        >
                                                                            <feFlood
                                                                                floodOpacity={0}
                                                                                result="BackgroundImageFix"
                                                                            />
                                                                            <feColorMatrix
                                                                                in="SourceAlpha"
                                                                                result="hardAlpha"
                                                                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                            />
                                                                            <feOffset />
                                                                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                                                            <feBlend
                                                                                in2="BackgroundImageFix"
                                                                                result="effect1_dropShadow_374_135180"
                                                                            />
                                                                            <feBlend
                                                                                in="SourceGraphic"
                                                                                in2="effect1_dropShadow_374_135180"
                                                                                result="shape"
                                                                            />
                                                                        </filter>
                                                                    </defs>
                                                                </svg>
                                                                Germany (+49)
                                                            </span>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            role="menuitem"
                                                        >
                                                            <span className="inline-flex items-center">
                                                                <svg
                                                                    className="me-2 h-4 w-4"
                                                                    fill="none"
                                                                    viewBox="0 0 20 15"
                                                                >
                                                                    <rect
                                                                        width="19.1"
                                                                        height="13.5"
                                                                        x=".25"
                                                                        y=".75"
                                                                        fill="#fff"
                                                                        stroke="#F5F5F5"
                                                                        strokeWidth=".5"
                                                                        rx="1.75"
                                                                    />
                                                                    <mask
                                                                        id="a"
                                                                        style={{ maskType: "luminance" }}
                                                                        width={20}
                                                                        height={15}
                                                                        x={0}
                                                                        y={0}
                                                                        maskUnits="userSpaceOnUse"
                                                                    >
                                                                        <rect
                                                                            width="19.1"
                                                                            height="13.5"
                                                                            x=".25"
                                                                            y=".75"
                                                                            fill="#fff"
                                                                            stroke="#fff"
                                                                            strokeWidth=".5"
                                                                            rx="1.75"
                                                                        />
                                                                    </mask>
                                                                    <g mask="url(#a)">
                                                                        <path
                                                                            fill="#F44653"
                                                                            d="M13.067.5H19.6v14h-6.533z"
                                                                        />
                                                                        <path
                                                                            fill="#1035BB"
                                                                            fillRule="evenodd"
                                                                            d="M0 14.5h6.533V.5H0v14z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </g>
                                                                </svg>
                                                                France (+33)
                                                            </span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="relative w-full">
                                                <input
                                                    type="text"
                                                    id="phone-input"
                                                    name='contact'
                                                    className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                                                    pattern="/^\+91\d{10}"
                                                    placeholder="123-456-7890"
                                                    required=""
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="pincode"
                                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            {" "}
                                            Pincode{" "}
                                        </label>
                                        <input
                                            type="number"
                                            maxLength={6}
                                            id="pincode"
                                            name='pincode'
                                            defaultValue={address[0]?.pincode}
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                            placeholder="Enter Your Pincode"
                                            required=""
                                        />
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label
                                                htmlFor="select-state-input-3"
                                                className="block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                {" "}
                                                State*{" "}
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="select-state-input-3"
                                            name='state'
                                            defaultValue={address[0]?.state}
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                            placeholder="Enter Your State"
                                            required=""
                                        />
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <label
                                                htmlFor="select-city-input-3"
                                                className="block text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                {" "}
                                                City*{" "}
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id="select-city-input-3"
                                            name='city'
                                            defaultValue={address[0]?.city}
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                            placeholder="Enter Your City"
                                            required=""
                                        />
                                    </div>

                                    <div className='col-span-2'>
                                        <label
                                            htmlFor="address"
                                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            {" "}
                                            Address{" "}
                                        </label>
                                        <textarea
                                            type="text"
                                            id="address"
                                            name='address'
                                            defaultValue={address[0]?.address}
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                            required=""
                                        >
                                        </textarea>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <button
                                            type="button"
                                            onClick={addAddress}
                                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 12h14m-7 7V5"
                                                />
                                            </svg>
                                            Save this address
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Saved Address
                                </h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {
                                        address?.map(
                                            (d, i) => {
                                                return (

                                                    <div key={i} className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                                        <div className="flex items-start">
                                                            <div className="ms-4 text-sm">
                                                                <label
                                                                    htmlFor="pay-on-delivery"
                                                                    className="font-medium leading-none text-gray-900 dark:text-white"
                                                                >
                                                                    {d.name}
                                                                </label>
                                                                <p
                                                                    id="pay-on-delivery-text"
                                                                    className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                                                                >
                                                                    {d.address}, {d.city}, {d.state}, {d.pincode}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </div>

                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Payment
                                </h3>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    id="pay-on-delivery"
                                                    type="radio"
                                                    name="payment-method"
                                                    checked={payment_mode === 1 ? true : false}
                                                    onChange={(e) => setPaymentMode(1)}
                                                    className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                                />
                                            </div>
                                            <div className="ms-4 text-sm">
                                                <label
                                                    htmlFor="pay-on-delivery"
                                                    className="font-medium leading-none text-gray-900 dark:text-white"
                                                >
                                                    {" "}
                                                    Payment on delivery{" "}
                                                </label>
                                                <p
                                                    id="pay-on-delivery-text"
                                                    className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                                                >
                                                    +₹50 payment processing fee
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                        <div className="flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    checked={payment_mode === 0 ? true : false}
                                                    onChange={(e) => setPaymentMode(0)}
                                                    id="paypal-2"
                                                    type="radio"
                                                    name="payment-method"
                                                    defaultValue=""
                                                    className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                                />
                                            </div>
                                            <div className="ms-4 text-sm">
                                                <label
                                                    htmlFor="paypal-2"
                                                    className="font-medium leading-none text-gray-900 dark:text-white"
                                                >
                                                    {" "}
                                                    RazorPay{" "}
                                                </label>
                                                <p
                                                    id="paypal-text"
                                                    className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                                                >
                                                    Pay Via UPI, Cards etc
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="sticky top-[100px]  mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                            <div className="flow-root">
                                <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                            Subtotal
                                        </dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                                            ₹ {Number(total).toFixed(2)}
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                            Processing fee
                                        </dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                                            ₹ {getProcessingFee(payment_mode)}
                                            {/* ₹ {payment_mode == 0 ? 0 : 50} */}
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4 py-3">
                                        <dt className="text-base font-bold text-gray-900 dark:text-white">
                                            Total
                                        </dt>
                                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                                            ₹ {(total + getProcessingFee(payment_mode)).toFixed(2)}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <button
                                    onClick={placeOrder}
                                    type="button"
                                    className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
                                >
                                    {payment_mode === 0 ? "Proceed to Payment" : "Place order"}
                                </button>
                                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    One or more items in your cart require an account.{" "}
                                    <a
                                        href='/singup'
                                        title=""
                                        className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                                    >
                                        Sign in or create an account now.
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </Container>
    )
}
