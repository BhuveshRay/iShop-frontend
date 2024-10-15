import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/admin/Card';
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Context } from '../../../ContextHolder';
import axios from "axios";

export default function View() {
  const { fetchProducts, products, productImageBaseUrl, apiProductBaseUrl, notify } = useContext(Context);

  useEffect(() => {
    fetchProducts();
  }, []);

  const changeStatus = (id, new_status) => {
    axios.put(apiProductBaseUrl + "/change-status/" + id + "/" + new_status)
      .then((success) => {
        if (success.data.status) {
          notify(success.data.msg, "success");
          fetchProducts();
        } else {
          notify(success.data.msg, "error");
        }
      }).catch((error) => {
        notify(error.message, "error");
      });
  }

  const delHandler = (id) => {
    axios.delete(apiProductBaseUrl + "/delete/" + id)
      .then((success) => {
        if (success.data.status) {
          notify(success.data.msg, "success");
          fetchProducts();
        } else {
          notify(success.data.msg, "error");
        }
      }).catch((error) => {
        notify(error.message, "error");
      });
  }

  return (
    <Card className="border border-black">
      <div>
        {/* breadcrumb */}
        <Link to={'/admin'}>Dashboard</Link>/Product
      </div>
      <hr className='my-3' />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sr
              </th>
              <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              {/* <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th> */}
              <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="border border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* {console.log(products)} */}
            {products.map((prod, index) => {
              return (
                <tr key={prod._id}>
                  <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{prod.name}</td>
                  <td className="border border-gray-200 px-4 py-2">{prod.slug}</td>
                  {/* <td className="border border-gray-200 px-4 py-2">{prod.category.name}</td> */}
                  <td className="border border-gray-200 px-4 py-2">
                    {
                      prod.color.map(
                        (cl, i) => {
                          return <div key={i}>{cl.name}</div>
                        }
                      )
                    }
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <img width={50} height={50} src={process.env.REACT_APP_API_BASE_URL + productImageBaseUrl + prod.image} alt="" />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <div>{prod.original_price}</div>
                    <div>{prod.discount_percent}% off</div>
                    <div>{prod.final_price}</div>
                  </td>
                  <td className="flex justify-center items-cemter px-4 py-2">
                    {
                      prod.status === true
                        ? <button onClick={() => changeStatus(prod._id, false)} className='p-2 border bg-green-500'>Active</button>
                        : <button onClick={() => changeStatus(prod._id, true)} className='p-2 border bg-orange-500'>Inactive</button>
                    }
                    
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <Link to={"/admin/product/edit/" + prod._id}>
                      <FaPencil className='inline mx-2' />
                    </Link>
                    <MdDelete className='inline mx-2' onClick={() => delHandler(prod._id)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}




