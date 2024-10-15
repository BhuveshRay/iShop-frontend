import React, { useContext, useRef } from 'react';
import Card from '../../../components/admin/Card'
import { Link } from 'react-router-dom';
import axios from "axios";
import { Context } from '../../../ContextHolder';


export default function Add() {
  const { apiCategoryBaseUrl, notify } = useContext(Context);
 const slugRef = useRef();

//  console.log(apiCategoryBaseUrl);

  const titleToSlug = (title) => {
    const slug = title.toLowerCase().trim().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    slugRef.current.value = slug;
  }
  

  const submitHandler = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const slug = event.target.slug.value;
    const image = event.target.image.files[0];
  
    if(name !=="" && slug !== ""  && image !== undefined){
      const formData = new FormData();
      formData.append("name",name);
      formData.append("slug",slug);
      formData.append("image", image);
    //http://localhost:5000/category/create
    axios.post(apiCategoryBaseUrl + "/create", formData)
    .then(
      (success) => {
       if(success.data.status === 1){
        event.target.reset();
        notify(success.data.msg, "success");
       }else{
        notify(success.data.msg, "error");
       }
      //  notify(success.data.msg,success.data.status);
      }
    ).catch(
      (error) => {
      notify(error,"error");
      }
    )
  }
  } 
  return (
    <Card>
      <div>
        <Link to={'/admin'}>Dashboard</Link>/<Link to={'/admin/category/view'}>Category</Link>/Add
      </div>
      <hr className='my-3' />
      <form encType='multipart/form-data' onSubmit={submitHandler}>
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
