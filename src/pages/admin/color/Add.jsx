import React, { useContext} from 'react';
import Card from '../../../components/admin/Card';
import { Link } from 'react-router-dom';
import { Context } from '../../../ContextHolder';
import axios from "axios";
// import { useState } from 'react';

export default function Add() {
  const { notify,apiColorBaseUrl } = useContext(Context);
  // const [color, setColor] = useState('');
  // const [name, setName] = useState('');


  
  const submitHandler = (event) => {
    event.preventDefault();
    // const formData = new FormData();
    const name = event.target.name.value;
const code=event.target.color.value;
    // formData.append();
    // formData.append();
    // formData.append('slug',event.target.color.value);
  axios.post(apiColorBaseUrl + "/create",{name, code}
  )
    .then(
      (success) => {
        if(success.data.status === 1){
          event.target.reset();
        }
        notify(success.data.msg, "success");
      //  notify(success.data.msg,success.data.status);
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
        <Link to={'/admin'}>Dashboard</Link>/<Link to={'/admin/color/view'}>Color</Link>/Add
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
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="slug" className="block text-gray-700 text-sm font-bold mb-2">
           Color
          </label>
          <input
            type="color"
            id="color"
            name="color"
            className="w-full border-none"
            // readOnly
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
