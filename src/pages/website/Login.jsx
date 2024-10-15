import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../ContextHolder';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../reducers/UserSlice';
import { dbCart } from '../../reducers/CartSlice';

const Login = () => {
    const { cart } = useSelector( store => store.cart);
const { notify, products, apiUserBaseUrl,  } = useContext(Context);
const dispatcher = useDispatch();
const navigator = useNavigate();

    const loginUserHandler = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        axios.post(apiUserBaseUrl + "/login", data)
        .then(
            (success) => {
             if(success.data.status === 1){
                dispatcher(loginUser(success.data.user));
                axios.post(apiUserBaseUrl + "/move-to-cart",
                    {
                        user_id: success.data.user._id,
                        cartData:JSON.stringify(cart)
                    }
                )
                .then(
                    (success) =>{
                       if(success.data.status === 1){
                        let total = 0;
                        const d = success.data.userCart.map(
                            (uc) => {
                                const found = products.find(p => p._id === uc.product_id);
                               const finalPrice = found.final_price === found.original_price ? found.original_price : found.final_price;
                                if(found){
                                  total = total + (finalPrice * uc.qty);
                                  return{
                                    pId: uc.product_id,
                                    qty:uc.qty
                                };
                                }else {
                                    // Handle case where product is not found
                                    return null;
                                }
                                
                            }
                        )
                        dispatcher(dbCart({userDBCart:d, total }))
                       }
                    }
                )
                navigator("/");
              e.target.reset();
              notify(success.data.msg, "success");
             }
            //  notify(success.data.msg, success.data.status);
            }
          ).catch(
            (error) => {
            notify(error,"error");
            }
          )
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form onSubmit={loginUserHandler} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Don't have an account? Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
