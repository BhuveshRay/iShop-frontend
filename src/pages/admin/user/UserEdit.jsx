import React, { useContext } from 'react'
import { Context } from '../../../ContextHolder';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '../../../components/admin/Card';

export default function UserEdit() {
    const {apiUserBaseUrl, notify,fetchUsers} = useContext(Context);

    // const editHandler = (id) => {
    //     console.log(apiUserBaseUrl+"/edit-user/"+ id)
    //     axios.put(apiUserBaseUrl+ "/edit-user/"+ id)
    //     .then(
    //       (success) => {
    //         if(success.data.id){
    //           notify(success.data.msg, "success");
    //             fetchUsers();
    //         }else{
    //           notify(success.data.msg, "error");
    //         }
    //       }
    //     ).catch(
    //       (error) => {
    //         notify(error.message, "error");
    //       }
    //     )
    //   }
    const submitHandler = async (e) => {
        e.preventDefault();
    };
    
  return (
    <Card>
    <div>
      <Link to={'/admin'}>Dashboard</Link>/<Link to={'/admin/user/view'}>User</Link>/Edit
    </div>
    <hr className='my-3' />
    <form encType='multipart/form-data' method='post' onSubmit={submitHandler}>
      <div className='mb-4'>
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder='Enter name'
          className="appearance-none w-full border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className='mb-4'>
        <label htmlFor="slug" className="block text-gray-700 text-sm font-bold mb-2">
         email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder='Enter email'
          className="appearance-none w-full border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className='mb-4'>
        <label htmlFor="slug" className="block text-gray-700 text-sm font-bold mb-2">
         password
        </label>
        <input
          type="number"
          id="password"
          name="password"
          placeholder='Enter password'
          className="appearance-none w-full border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      
      <div className='flex items-center justify between'>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>


  </Card>
  )
}
