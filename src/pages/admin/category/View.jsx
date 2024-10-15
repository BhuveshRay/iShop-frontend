import React, { useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Card from '../../../components/admin/Card';
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Context } from '../../../ContextHolder';
import axios from "axios";

export default function View() {
  const { fetchCategories, categories,categoryImageUrl, apiCategoryBaseUrl, notify } =useContext(Context);
  
  useEffect(
    () => {
      fetchCategories();
    },
    []
  )

  const changeStatus = (id, new_status) => {
    axios.put(apiCategoryBaseUrl+"/change-status/" + id + "/" + new_status)
    .then(
      (success) => {
        if(success.data.status){
          notify(success.data.msg, "success");
            fetchCategories();
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
    axios.delete(apiCategoryBaseUrl +"/delete/" +id)
    .then(
      (success) => {
        if(success.data.id){
          notify(success.data.msg, "success");
            fetchCategories();
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
      <Link to={'/admin'}>Dashboard</Link>/Category
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
          Slug
        </th>
        <th
          scope="col"
          className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Image
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
      {/* Your table rows will go here */}
      {/* Example row */}
      {categories.map(
        (cat, index) => {
          return <tr key={index}>
        <td className="border border-gray-200 px-4 py-2">{index+1}  </td>
        <td className="border border-gray-200 px-4 py-2">{cat.name}</td>
        <td className="border border-gray-200 px-4 py-2">{cat.slug}</td>
        <td className="border border-gray-200 px-4 py-2">
          <img width={50} height={50} src={process.env.REACT_APP_API_BASE_URL+categoryImageUrl+cat.image_name} alt="image" />
        </td>
        <td className="flex justify-center items-cemter px-4 py-2">
          {
            cat.status === true 
            ? <button onClick={() => changeStatus(cat._id, false)} className='p-2 border bg-green-500'>Active</button> 
            : <button onClick={() => changeStatus(cat._id, true)} className='p-2 border bg-orange-500'>Inactive</button>
          }
        </td>
        <td className="border border-gray-200 px-4 py-2 ">
          <Link to={"/admin/category/edit/" + cat._id}>
        <FaPencil className='inline mx-2'/>
        </Link>
        <MdDelete className='inline mx-2'onClick={() => delHandler(cat._id)}/>
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
