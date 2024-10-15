import React from 'react';
import {Link} from 'react-router-dom';
import Card from '../../components/admin/Card';
import { useSelector } from 'react-redux';
// import { MdDelete } from "react-icons/md";
// import { FaPencil } from "react-icons/fa6";
// import { Context } from '../../../ContextHolder';

export default function View() {
//   const admin = useSelector(store => store.admin);
// console.log(admin.data);
  return (
    <Card>
    <div>
      {/* breadcrum */}
      <Link to={'/admin'}>Dashboard</Link>/AdminProfile
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
      {/* {categories.map(
        (cat, index) => {
          return <tr key={index}>
        <td className="border border-gray-200 px-4 py-2">{index+1}  </td>
        <td className="border border-gray-200 px-4 py-2">{cat.name}</td>
        <td className="border border-gray-200 px-4 py-2">{cat.slug}</td>
        <td className="border border-gray-200 px-4 py-2">
          <img width={50} height={50} src={process.env.REACT_APP_API_BASE_URL+categoryImageUrl+cat.image_name} alt="image" />
        </td>
        <td className="border border-gray-200 px-4 py-2">
          {
            cat.status === true 
            ? <button onClick={() => changeStatus(cat._id, false)} className='p-2 border bg-green-500'>Active</button> : <button onClick={() => changeStatus(cat._id, true)} className='p-2 border bg-orange-500'>Inactive</button>
          }
        </td>
        <td className="border border-gray-200 px-4 py-2 ">
          <Link>
        <FaPencil className='inline mx-2'/>
        </Link>
        <MdDelete className='inline mx-2'onClick={delHandler}/>
          <button className="text-red-600 hover:text-red-900">Delete</button>
        </td>
      </tr>
        }
      )}  */}
    </tbody>
  </table>
</div>
  </Card>
  )
}
