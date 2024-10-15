import React, { useState} from 'react'

export default function RangeSlider() {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);

    const handlerMinChange = (e) => {
        setMinPrice(parseInt(e.target.value));
    }

    const handlerMaxChange = (e) => {
        setMaxPrice(parseInt(e.target.value));
    }
  return (
    <div className='flex items-center'>
    <input
    type='range'
    min="0"
    max="1000"
    value={minPrice}
    onchange={handlerMinChange}
    className='mr-2'/> <span>${minPrice}</span>
    <span className='mx-2'>-</span>
    <span>${maxPrice}</span>
    <input
    type='range'
    min="0"
    max="1000"
    value={maxPrice}
    onchange={handlerMaxChange}
    className='ml-2'
    />
    </div>
  )
}
