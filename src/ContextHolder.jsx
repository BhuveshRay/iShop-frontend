import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Context = createContext({ apiCategoryBaseUrl: '' });

export default function ContextHolder(props) {
  const [loader, setLoader] = useState(false);
  const [categories, setCategory] = useState([]);
  const [colors, setColor] = useState([]);
  const [products, setProduct] = useState([]);
  const [productImageBaseUrl, setProductImageBaseUrl] = useState("");
  const [categoryImageUrl, setCategoryImageUrl] = useState("");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);


  const apiCategoryBaseUrl = process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_CATEGORY_BASE_URL;
  const apiColorBaseUrl = process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_COLOR_BASE_URL;
  const apiProductBaseUrl = process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_PRODUCT_BASE_URL;
  const apiUserBaseUrl = process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_USER_SIGNUP_URL;
  const apiOrderBaseUrl = process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_ORDER_PLACE_URL;
  const adminUserBaseUrl =  process.env.REACT_APP_API_BASE_URL+process.env.REACT_APP_ADMIN_API
  

  const notify = (msg, flag) => toast(msg, { type: flag ? "success" : "error" });

  const fetchCategories = (id = null) => {
    axios.get(apiCategoryBaseUrl)
      .then(
        (success) => {
          if (success.data.status === 1) {
            setCategory(success.data.categories);
            setCategoryImageUrl(success.data.imageBaseUrl);
          } else {

          }
        }
      ).catch(
        () => {
          setCategory([]);
        }
      )
  }

  const fetchColors = (id = null) => {
    axios.get(apiColorBaseUrl)
      .then(
        (success) => {
          setColor(success.data.colors);
        }
      ).catch(
        () => {
          setColor([]);
        }
      )
  }

  const fetchProducts = (category_slug = null, limit = null, range = null) => {
    setLoader(true);
    const searchParams = new URLSearchParams();
    if (category_slug != null) {
      searchParams.set("category_slug", category_slug);
    }
    if (limit != null) {
      searchParams.set("limit", limit);
    }
    if (range != null) {
      searchParams.set("range_start", range.range_start);
      searchParams.set("range_end", range.range_end);
    }
    axios.get(apiProductBaseUrl + "?" + searchParams.toString())
      .then(
        (success) => {
          setProduct(success.data.products);
          setProductImageBaseUrl(success.data.imageBaseUrl)
        }
      ).catch(
        () => {
          setProduct([]);
        }
      ).finally(
        () => {
          setLoader(false);
        }
      )
  }
  const fetchUsers = () => {
    axios.get(apiUserBaseUrl + "/user-data/user_id")
      .then(
        (success) => {
          if (success.data.status === 1) {
            setUsers(success.data.decryptedUsers);
          }
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      )
  }



  const fetchOders = () => {
    axios.get(apiOrderBaseUrl + "/order-data")
      .then(
        (success) => {
          if (success.data.status === 1) {
            setOrders(success.data.amdinOrders);
          } else {

          }
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      )
  }


  useEffect(
    () => {
      fetchCategories();
      fetchColors();
      fetchProducts();
      fetchUsers();
      fetchOders();
    }, []
  )

  return (
    <>
      <div className='w-full fixed z-[9999] h-full  justify-center items-center' style={{
        background: "rgba(0,0,0,0.7",
        display: loader ? 'flex' : 'none',
      }}>

        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>

      </div>
      <ToastContainer />
      <Context.Provider value={{ notify, categories, categoryImageUrl, fetchCategories, apiCategoryBaseUrl, apiColorBaseUrl, apiProductBaseUrl, products, productImageBaseUrl, fetchProducts, colors, fetchColors, apiUserBaseUrl, apiOrderBaseUrl, fetchUsers, users, fetchOders, orders, adminUserBaseUrl}}>
        {props.children}
      </Context.Provider>
    </>
  )
}

export { Context };
