import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Context } from '../../../ContextHolder';
import Card from '../../../components/admin/Card';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {apiCategoryBaseUrl,apiColorBaseUrl, apiProductBaseUrl,  } = useContext(Context);

    const [product, setProduct] = useState({
        name: '',
        slug: '',
        original_price: '',
        discount_price: '',
        final_price: '',
        image_name: '',
        other_images: [],
        category: '',
        color: []
    });

    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(apiProductBaseUrl);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching the product data:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(apiCategoryBaseUrl);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchColors = async () => {
            try {
                const response = await axios.get(apiColorBaseUrl);
                setColors(response.data);
            } catch (error) {
                console.error('Error fetching colors:', error);
            }
        };

        fetchProduct();
        fetchCategories();
        fetchColors();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(apiProductBaseUrl, product);
            navigate('/products');
        } catch (error) {
            console.error('Error updating the product:', error);
        }
    };

    return (
        <Card>
      <div>
        <Link to={'/admin'}>Dashboard</Link>/<Link to={'/admin/category/view'}>Category</Link>/Edit
      </div>
      <hr className='my-3' />
      <form encType='multipart/form-data' method='post' onSubmit={handleSubmit}>
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
            Slug:
          </label>
          <input
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

          <div className='mb-4'>
            <label >Existing Image</label>
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
    );
};

export default EditProduct;
