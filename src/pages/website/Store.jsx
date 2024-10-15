import React, { useContext, useEffect, useState } from 'react'
import ProductBox from '../../components/website/ProductBox'
import Container from '../../components/Container';
import { Context } from '../../ContextHolder';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

export default function Store() {
  const { fetchCategories, categories, fetchProducts, products, productImageBaseUrl } = useContext(Context);
  const [limit, setLimit] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();
  const { category_slug } = useParams();
  const [range, setRange] = useState({ range_start: 100, range_end: 10000 })
  useEffect(
    () => {
      fetchCategories();
    }, []
  )

  useEffect(
    () => {
      fetchProducts(category_slug ?? null, limit ?? searchParams.get('limit'), range);
    }, [category_slug, limit] // first time and on category slug change
  )

  const goFilter= () => {
    fetchProducts(category_slug ?? null, limit ?? searchParams.get('limit'), range);
  }

  useEffect(
    () => {
      const searchParams = {};
      searchParams.limit = limit;
      searchParams.range_start = range.range_start;
      searchParams.range_end = range.range_end;
      setSearchParams(searchParams);
      // urlQuery.set("rangeStart",100);
      // urlQuery.set("rangeEnd",500);
      // console.log(urlQuery.toString());
    }, [limit, range]
  )

  return (
    <Container >
      <div className='md:grid grid-cols-4 gap-4'>
        <div className='hidden md:block'>
          <div className='bg-[#F6F7F8] p-3'>
            <div className='font-semibold uppercase tex-[18px]'>Categories</div>
            {
              categories.map(
                (cat) => {
                  return (
                    <Link key={cat._id} to={"/store/" + cat.slug}>
                      <div className={`${category_slug === cat.slug ? 'text-blue-600' : ''} relative font-semibold `}>
                        {cat.name}
                        <span className='absolute right-0 opacity-35'>{cat.prodCount}</span>
                      </div>
                    </Link>
                  )
                }
              )
            }
          </div>
          <div className='bg-[#F6F7F8] p-3 my-4'>
            <div className='font-semibold uppercase text-[18px]'>Price Range</div>
            <div className="flex items-center gap-3 relative my-5">
              100
              <div className='absolute left-[50%] top-[-15px] translate-x-[-50%]'>
                ₹{range.range_start}-₹{range.range_end}</div>
              <RangeSlider value={[range.range_start, range.range_end]} onInput={(d) => setRange({ range_start: d[0], range_end: d[1] })
              } min="100" max="10000" className="my-7" />
              1000
            </div>
            <button className='p-3 border w-full bg-white' onClick={goFilter}>Go</button>
          </div>
        </div>

        <div className='col-span-3'>

          <div className='w-full h-[340px] bg-[#2E90E5] relative'>
            <div className='p-10'>
              <div className='text-[42px] text-[#FFFFFF] '>iPhone8</div>
              <div className='text-[16px] text-[#FFFFFF] py-3'>Performance and design. Taken right <br />to the edge.</div>
              <div className='text-[14px] w-[75px] text-center fonts-semibold border-b-4 border-[#FFFFFF]-500 text-[#FFFFFF] py-2'>Shop Now</div>
            </div>
            <img src="images/iphone_8.png" alt="" className='absolute bottom-0 md:top-0 right-0 w-[200px] md:w-[365px] h-full ' />
          </div>


          <div className='bg-[#F6F7F8] gap-4  flex items-center px-4 rounded-[4px] my-4 h-[60px]'>
            <div>{products.length} Items</div>
            <select value={limit} onChange={(e) => setLimit(e.target.value)} className='bg-white py-2 w-[120px]'>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="0">All</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              products.map(
                (prod) => {
                  return <ProductBox key={prod._id} {...prod} />
                }
              )
            }
          </div>
        </div>
      </div>
    </Container>
  )
}