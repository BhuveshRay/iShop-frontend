import React, { useContext, useEffect } from 'react';
import Card from '../../../components/admin/Card';
import {Link} from 'react-router-dom';
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Context } from '../../../ContextHolder';
import axios from 'axios';

export default function View() {
  const {colors,fetchColors, notify, apiColorBaseUrl } =useContext(Context);

  useEffect(
    () => {
      fetchColors();
    },[]
  )

  const changeStatus = (id, new_status) => {
    axios.put(apiColorBaseUrl+"/change-status/" + id + "/" + new_status)
    .then(
      (success) => {
        if(success.data.status){
          notify(success.data.msg, "success");
            fetchColors();
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
    axios.delete(apiColorBaseUrl +"/delete/" +id)
    .then(
      (success) => {
        if(success.data.id){
          notify(success.data.msg, "success");
          fetchColors();
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
    <Card>
    <div>
      {/* breadcrum */}
      <Link to={'/admin'}>Dashboard</Link>/Product
      </div>
      <hr className='my-3' />
      <div className="overflow-x-auto">
  <table  className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th
          scope="col"
          className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Sr
        </th>
        <th
          scope="col"
          className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Name
        </th>
        <th
          scope="col"
          className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
         Color
        </th>
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
    <tbody className="bg-white divide-y divide-gray-200">
      {colors.map(
        (col, index) => {
          return <tr key={index}>
        <td className="border border-gray-200 px-4 py-2">{index+1}  </td>
        <td className="border border-gray-200 px-4 py-2">{col.name}</td>
        <td className={`border border-gray-200 px-4 py-2 bg-${col.name}-500`}>{col.code}</td>
        <td className="flex justify-center items-center  px-4 py-2">
          {
            col.status === true 
            ? <button onClick={() => changeStatus(col._id, false)} className='p-2 border bg-green-500'>Active</button> 
            : <button onClick={() => changeStatus(col._id, true)} className='p-2 border bg-orange-500'>Inactive</button>
          }
        </td>
        <td className="border border-gray-200 px-4 py-2 ">
          <Link to={"/admin/product/edit/" + col._id}>
        <FaPencil className='inline mx-2'/>
        </Link>
        <MdDelete onClick={() => delHandler(col._id)} className='text-red-600 inline mx-2'/>
        </td>
      </tr>
        }
      )} 
    </tbody>
  </table>
</div>
  </Card>
  )
}
