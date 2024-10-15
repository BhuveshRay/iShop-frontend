import React, { useContext, useEffect, useState } from 'react';
import Container from '../../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Context } from '../../ContextHolder';
import { changeQty, removeFromCart } from '../../reducers/CartSlice';
import { useNavigate } from 'react-router-dom'
import { dbCart } from '../../reducers/CartSlice';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const { cart, total } = useSelector(store => store.cart);
    const user = useSelector(store => store.user);
    const { products } = useContext(Context);
    const navigator = useNavigate()
    const checkout = () => {
        if(user.data === null){
            navigator("/login");
        }else{
            navigator("/checkout");
        }
    }

    useEffect(
        () => {
            const data = [];
            for (let c of cart) {
                const found = products.find(prod => prod._id === c.pId);
                if (found) {
                    data.push(
                        {
                            ...found,
                            qty: c.qty
                        }
                    )
                }
                //    for(let p of products){
                //     if(p._id == c.pId){
                //         data.push({
                //             ...p,
                //             qty: c.qty
                //         })
                //     }
                //    }
            }
            setCartItems(data);
        }, [cart, products]
    )

    return (
        <Container>
            <div className='container mx-auto px-4 py-8'>
                <h1 className='text-2xl font-bold mb-4'>Your Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p className='text-gray-500'>Your cart is currently empty.</p>
                ) : (
                    <div >
                        {cartItems.map((item) => (
                            <CartItem key={item._id} {...item}/>
                        ))
                        }
                       
                        <div className='text-end text-2xl mt-4'>${total.toFixed(2)}</div>
                        <div className='flex justify-end mt-8'>
                            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700' onClick={checkout}>
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    )
}
const CartItem = ({_id: product_id, name,image,final_price, original_price, qty }) => {
    const { productImageBaseUrl } = useContext(Context);
    const dispatcher = useDispatch();
    const finalPrice = final_price === original_price ? original_price : final_price
    
    return (
        <div className='flex items-center justify-between  border-b border-gray-200 py-4 px-4 hover:bg-gray-100 gap-2'>
            <div className='md:flex items-center gap-10 w-[350px]'>
                <img
                    className='w-16 h-16 rounded mr-4'
                    src={process.env.REACT_APP_API_BASE_URL + productImageBaseUrl + image} alt={name}
                />
                <div className='text-left'>
                    <h3 className='font-bold text-lg'>{name}</h3>
                    <p className='text-gray-700 font-bold'>
                        ${finalPrice.toFixed(2)}*{qty} = ${''}
                        {(finalPrice * qty).toFixed(2)}
                    </p>
                </div>
            </div>
            <div className='flex'>
                <button className='p-3 border md:mx-2'
                disabled={qty === 1 ? true : false}
                onClick={() => dispatcher(changeQty({ price:finalPrice, pId: product_id , new_qty: qty - 1, flag: false}))}
                >-
                </button>

               <span className='p-3'>{qty}</span>

                <button className='p-3 border md:mx-2' 
                 disabled={qty === 10 ? true : false}
                onClick={() => dispatcher(changeQty({price:finalPrice, pId: product_id , new_qty: qty + 1, flag: true}))}
                >+
                </button>
            </div>
            <button
                className='text-red-500 hover:text-red-700 focus:outline-none'
                onClick={() => dispatcher(removeFromCart({pId: product_id, total_price: finalPrice * qty}))}
            >
                Remove
            </button>
        </div>
    );
};