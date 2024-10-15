import React, { useContext } from 'react'
import { Context } from '../../ContextHolder'
import ProductBox from '../../components/website/ProductBox'
export default function Macbook() {
  const { products } = useContext(Context);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              products.map(
                (prod) => {
                  return <ProductBox key={prod._id} {...prod} />
                }
              )
            }
          </div>
  )
}
