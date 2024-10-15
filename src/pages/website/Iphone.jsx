import React, { useContext, useEffect, useState } from 'react';
import { Context } from './../../ContextHolder';

const Iphone = () => {
    const { products, fetchProducts,apiCategoryBaseUrl } = useContext(Context);
    
    useEffect(
        () => {
            fetchProducts();
            // fetchCategoryData();
            filterIphoneProd();
        }, []
    )

    useEffect(() => {
        // Filter iPhone products once products are fetched
        if (products && products.length > 0) {
            filterIphoneProd();
        }
    }, [products]);

    // 65e06fbcc0241446dcce678d
    function filterIphoneProd() {
        const data = products.filter(
            (prod) => {
                return prod.category && prod.category._id === "6655fe87780bb28e3704efcc";
            }
        )
        setFilterProduct(data);
    }
    
    const [filterProduct, setFilterProduct] = useState([]);  
    

    return (
        <div>
        {
            filterProduct.map(
                (iphone, i) => {
                return(
                    <div key={i}>
                    <img src={apiCategoryBaseUrl+ "/" +iphone.image} alt="" />
                    </div>
                )
                   
                }
            )
        }
        </div>
    );
}

export default Iphone;