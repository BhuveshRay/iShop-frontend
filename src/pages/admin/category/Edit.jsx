import React, { useContext, useEffect, useRef, useState } from 'react';
import Card from '../../../components/admin/Card'
import { Link, useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import { Context } from '../../../ContextHolder';


export default function Edit() {
    const [categoryData, setCategoryData] = useState({});
  const { apiCategoryBaseUrl, notify} = useContext(Context);
 const slugRef = useRef();
 const {cid} = useParams();
 const navigator = useNavigate();

 useEffect(
    () => {
        if(cid != null){
            axios.get(apiCategoryBaseUrl+"/"+cid)
            .then(
                (success) => {
                   if(success.data.status === 1){
                    setCategoryData(success.data.category);
                   }
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )
        }
    },
    [cid,apiCategoryBaseUrl]
 )

  const titleToSlug = (title) => {
    const slug = title.toLowerCase().trim().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    slugRef.current.value = slug;
  }
  
  const submitHandler =(event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("slug", event.target.slug.value);
    formData.append("old_name", categoryData.image_name);
    formData.append("image", event.target.image.files[0] ?? null);
    axios.put(apiCategoryBaseUrl + "/update/" + cid, formData)
    .then(
      (success) => {
       if(success.data.status === 1){
        navigator("/admin/category/view")
        // notify(success.data.msg, "success");
       }
       notify(success.data.msg,success.data.status);
      }
    ).catch(
      (error) => {
      notify(error,"error");
      }
    )
  }

  return (
    <Card>
      <div>
        <Link to={'/admin'}>Dashboard</Link>/<Link to={'/admin/category/view'}>Category</Link>/Edit
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
            defaultValue={categoryData?.name}
            placeholder='Enter name'
            className="appearance-none w-full border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => titleToSlug(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="slug" className="block text-gray-700 text-sm font-bold mb-2">
            Slug:
          </label>
          <input
           ref={slugRef}
            type="text"
            id="slug"
            name="slug"
            defaultValue={categoryData?.slug}
            placeholder='Enter slug'
            className="appearance-none w-full border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept='image/'
            className="appearance-none w-full border rounded px-3 py-2 eading-tight focus:outline-none focus:shadow-outline"
          />
          </div>

          <div className='mb-4'>
            <label >Existing Image</label>
          <img className='my-5' src={process.env.REACT_APP_API_BASE_URL+"/images/category/"+categoryData?.image_name} alt="" />
          <h6>{categoryData?.image_name}</h6>
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
