import React, { useContext }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../ContextHolder';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../reducers/UserSlice';

export default function AdminSigup() {
    const { adminUserBaseUrl, notify } = useContext(Context);
    const dispatcher = useDispatch();
    const navigator = useNavigate(); 
     const submitHandler = (e) => {
         e.preventDefault();
         const data = {
             name: e.target.name.value,
             email: e.target.email.value,
             password: e.target.password.value,
             confirm_password: e.target.confirm_password.value,
         }
         
         // localhost:5000/user/signup
         axios.post( adminUserBaseUrl + "/signup", data)
         .then(
             (success) => {
              if(success.data.status === 1){
                 dispatcher(loginUser(success.data.admin));
                 navigator("/");
               e.target.reset();
               notify(success.data.msg, "success");
              }
             //   notify(success.data.msg, success.data.status);
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
        <h2 className="text-2xl font-bold text-center">Admin Sign Up</h2>
        <form className="space-y-6" onSubmit={submitHandler}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Admin Full Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                    id="confirm-password"
                    name="confirm_password"
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
                    Sign Up
                </button>
            </div>
        </form>
        <div className="text-sm text-center">
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Already have an account? Log in</Link>
        </div>
    </div>
</div>
  )
}
