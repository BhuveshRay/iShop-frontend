import React, { useContext, useEffect, useRef } from 'react';
import Card from '../../../components/admin/Card';
import { Link } from 'react-router-dom';
import { Context } from '../../../ContextHolder';
import Select from 'react-select';
import axios from 'axios';

export default function Add() {
  const { apiProductBaseUrl,notify,fetchProducts, fetchCategories, categories, fetchColors, colors } = useContext(Context);
 let prodCat = null;
 let prodColor = null;

  useEffect(
    () => {
      fetchCategories();
      fetchColors();
      fetchProducts();
    },[]
  )
  const slugRef = useRef();
  const originalPriceRef = useRef();
  const discountPercentRef =useRef();
  const finalPriceRef = useRef();
 
 
   const titleToSlug = (title) => {
     const slug = title.toLowerCase().trim().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
     slugRef.current.value = slug;
   }

   const calFinalPrice = () => {
    if(originalPriceRef.current.value !== "" && discountPercentRef.current.value !== ""){
      if(discountPercentRef.current.value >=100){
        discountPercentRef.current.style.border = "1px red solid";
        discountPercentRef.current.nextElementSibling.style.display = "";
        finalPriceRef.current.value = 0;
      }else{
        discountPercentRef.current.style.border = "";
        discountPercentRef.current.nextElementSibling.style.display = "none";
        const final = originalPriceRef.current.value - ((discountPercentRef.current.value * originalPriceRef.current.value)/100)
      finalPriceRef.current.value = final;
      }
    }
   }

   const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
   for(let otherImage of event.target.other_images.files){
    formData.append('other_images', otherImage)
   }
    formData.append('name',event.target.name.value);
    formData.append('slug',event.target.slug.value);
    formData.append('original_price',event.target.original_price.value);
    formData.append('discount_percent',event.target.discount_percent.value);
    formData.append('final_price',event.target.final_price.value);
    formData.append('category', prodCat);
    formData.append('color', JSON.stringify(prodColor));
    formData.append("image", event.target.image.files[0]); 
  
    //http://localhost:5000/product/create
    axios.post(apiProductBaseUrl + "/create", formData)
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
  return (
    <div>
      <Card>
        <div>
          <Link to={'/admin'}>Dashboard</Link>/<Link to={'/admin/product/view'}>Product</Link>/Add
        </div>
        <hr className='my-3' />
        <form onSubmit={submitHandler} encType='multipart/form-data' >
          <div className="grid grid-cols-2 gap-3">
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

          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className='mb-4'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
               Original Price
              </label>
              <input 
              ref={originalPriceRef}
                type="text"
                name="original_price"
                placeholder='Enter original price'
                className="appearance-none w-full border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={calFinalPrice}
              />
            </div>
            <div className='mb-4'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Discount Percent(%)
              </label>
              <input
              defaultValue={0}
              ref={discountPercentRef}
                type="text"
                name="discount_percent"
                placeholder='Enter discount_percent'
                className="appearance-none w-full border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={calFinalPrice}
              />
              <span className='text-red-500' style={{display:"none"}}>Value must be less than 100</span>
            </div>

            <div className='mb-4'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
               Final Price
              </label>
              <input
              ref={finalPriceRef}
              readOnly
                type="text"
                name="final_price"
                className="appearance-none w-full border rounded px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

          </div>
        
        <div className="grid grid-cols-2 gap-3">
        <div className='mb-4'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
               Category
              </label>
              <Select 
              onChange={
                (option) => {
                  prodCat = option.value;
              }}
              placeholder="Select a category"
              options={
               categories.map(
                  (cat) => {
                    return{value: cat._id, label: cat.name}
                  }
                )
              }/>
              </div>
{/* --------------------------------- */}
        <div className='mb-4'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
               Color
              </label>
              <Select
              onChange={
                (options) => {
                  prodColor = options.map((option) => option.value);
              }}
               closeMenuOnSelect={false} placeholder="Select colors" isMulti options={
                colors.map(
                  (color) => {
                    return{value: color._id, label: color.name}
                  }
                )
              }/>
              </div>
              </div>
        {/* --------------------------- */}

          <div className='mb-4'>
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
             Main Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept='image/*'
              className="appearance-none w-full border rounded px-3 py-2 eading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
             Other Images
            </label>
            <input
              type="file"
              id="other_images"
              name="other_images"
              multiple={true}
              accept='image/*'
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
    </div>
  )
}
