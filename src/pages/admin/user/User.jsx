import React, {useContext, useEffect} from 'react'
import Card from '../../../components/admin/Card';
import { Link } from 'react-router-dom';
import { Context } from '../../../ContextHolder';
import axios from 'axios';
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export default function User() {
  const { fetchUsers,apiUserBaseUrl, users, notify} = useContext(Context);

  useEffect(
    () => {
      fetchUsers();
    },[]
  )
  
  const changeStatus = (id, new_status) => {
    axios.put(apiUserBaseUrl+"/change-status/" + id + "/" + new_status)
    .then(
      (success) => {
        if(success.data.status){
          notify(success.data.msg, "success");
            fetchUsers();
        }else{
          notify(success.data.msg, "error");
        }
      }
    ).catch(
      (error) => {
        notify(error.message, "error");
      }
    )
  }

  const delHandler = (id) => {
    axios.delete(apiUserBaseUrl +"/delete/" +id)
    .then(
      (success) => {
        if(success.data.id){
          notify(success.data.msg, "success");
            fetchUsers();
        }else{
          notify(success.data.msg, "error");
        }
      }
    ).catch(
      (error) => {
        notify(error.message, "error");
      }
    )
  }

  return (
    <div className='max-w-[1200px]'>
       <Card>
    <div>
      {/* breadcrum */}
      <Link to={'/admin'}>Dashboard</Link>/User
      </div>
      <hr className='my-3' />
      <div className="p-3 my-shadow rounded-xl overflow-y-auto overflow-x-auto">
  <table  className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="bg-gray-50 border border-black">
      <tr>
        <th
          className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Sr
        </th>
        <th
          className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Name
        </th>
        <th
          className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
         Password
        </th>
        <th
          className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Email
        </th>
        {/* <th
          scope="col"
          className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Address
        </th> */}
        <th
          scope="col"
          className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Status
        </th>
        <th
          scope="col"
          className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Action
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200 text-center">
      {users.map(
        (u, index) => {
          return <tr key={index}>
        <td className="border border-gray-200 px-4 py-2">{index+1}  </td>
        <td className="border border-gray-200 px-4 py-2">{u.name}</td>
        <td className="border border-gray-200 px-4 py-2">{u.password}</td>
        <td className="border border-gray-200 px-4 py-2">{u.email}</td>
        <td className="border border-gray-200 px-4 py-2">
          {
            u.status === true 
            ? <button onClick={() => changeStatus(u._id, false)} className='p-2 border bg-green-500'>Active</button> : <button onClick={() => changeStatus(u._id, true)} className='p-2 border bg-orange-500'>Inactive</button>
          }
        </td>
        <td className="border border-gray-200 px-4 py-2 ">
          <Link to={"/admin/user/user-edit/"}>
        <FaPencil className='inline mx-2'/>
        </Link>
        <MdDelete className='inline mx-2'onClick={() => delHandler(u._id)}/>
        </td>
      </tr>
        }
      )} 
    </tbody>
  </table>
</div>
  </Card>
    </div>
  )
}
