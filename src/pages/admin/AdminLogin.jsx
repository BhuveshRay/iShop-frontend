import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../ContextHolder';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../reducers/AdminSlice';

const AdminLogin = () => {
    const { cart } = useSelector( store => store.cart);
const { notify, adminUserBaseUrl  } = useContext(Context);
const dispatcher = useDispatch();
const navigator = useNavigate();

    const loginUserHandler = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        axios.post(adminUserBaseUrl+ "/login", data)
        .then(
            (success) => {
             if(success.data.status === 1){
                dispatcher(loginAdmin(success.data.admin));
                navigator("/admin");
              e.target.reset();
             }
             notify(success.data.msg, success.data.status);
            }
          ).catch(
            (error) => {
              console.log("error", error);
            }
          )
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Admin Login</h2>
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
                            Login In
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <Link to="/admin-signup" className="font-medium text-indigo-600 hover:text-indigo-500">Don't have an account? Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
