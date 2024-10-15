import React, { useState } from 'react'
import Container from '../Container'
import { IoCaretDownSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/UserSlice';
import { emptyCart } from '../../reducers/CartSlice';

export default function Header() {
 const { cart, total } = useSelector(store => store.cart); 
 const user = useSelector(store => store.user);
 const dispatcher = useDispatch();

 const logoutputHandler = () => {
    dispatcher(emptyCart());
    dispatcher(logout());
 }

const [toggle, setToggle] = useState(false);
    const menuItems = [
        {
            name:"Home",
            url:"/"
        },
        {
            name:"Store",
            url:"/store",
            data:[
                {
                    heading:"Accessories",
                    collection:[
                        {
                            name:"AirPort",
                            path:"/accessories/airport"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        },
                        {
                            name:"AirPort",
                            path:"/accessories/airport"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        },
                        {
                            name:"AirPort",
                            path:"/accessories/airport"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        }
                    ]
                },
                {
                    heading:"Category",
                    collection :[
                        {
                            name:"AirPort",
                            path:"/accessories/airport"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        }
                    ]
                },
                {
                    heading:"Gifts",
                    collection:[

                    ]
                }
            ]
        },
        {
            name:"Iphone",
            url:"/iphone"
        },
        {
            name:"Ipad",
            url:"/ipad"
        },
        {
            name:"Macbook",
            url:"/macbook"
        },
        {
            name:"Accesories",
            url:"/accesories",
            data:[
                {
                    heading:"Accessories",
                    collection:[
                        {
                            name:"AirPort",
                            path:"/accessories/airport"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        },
                        {
                            name:"AirPort",
                            path:"/accessories/airport"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        },
                        {
                            name:"AirPort",
                            path:"/accessories/airport"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        }
                    ]
                },
                {
                    heading:"Category",
                    collection :[
                        {
                            name:"AirPort",
                            path:"/accessories/airport"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        },
                        {
                            name:"AppleCare",
                            path:"/accessories/applecare"
                        }
                    ]
                },
                {
                    heading:"Gifts",
                    collection:[

                    ]
                }
            ]
        }
    ]
    return (
        <>
            <div className='p-2 w-full shadow hidden md:block sticky top-0 bg-white z-[9999]'>
            <Container className=" px-3 flex justify-between">
                <div className='flex items-center gap-3 text-[#262626]'>
                    <span>EN</span>
                    <IoCaretDownSharp />
                    <span>$</span>
                    <IoCaretDownSharp />
                </div>
                <div className='flex items-center gap-3 '>
                {
                    user.data === null
                    ? <Link to="/login">Login</Link>
                    : 
                    <>
                   <Link to={"/profile"}><FaUser/></Link> 
                     <span>Hii, {user.data.name}</span>
                     <span style={{cursor:"pointer"}} onClick={logoutputHandler}> Logout |</span>
                     </>
                }
                    <Link to={"/cart"} className='flex items-center gap-2'>
                    <FaBagShopping />
                    <span> {cart.length} Items |</span>
                    </Link>
                    <span className='text-gray-500'>| ${total} |</span>
                    <FaSearch className='ml-[50px]'/>
                </div>
            </Container>
            </div>

            <Container className="my-4 md:my-6 px-3" > 
            <div className=" flex justify-between  md:justify-center ">
                    <img src="images/logo.svg" alt="iShop logo" />
                    <GiHamburgerMenu onClick={() => setToggle(true)}  className='md:hidden text-3xl'/>
                    </div>
                    <div>
                    <ul className=' hidden md:flex justify-center my-6 gap-10  relative' id= 'menu-bar' > 
                    {/* typeof='none' */}
                    {
                        menuItems.map(
                            (item, index) => {
                                return  <li key={index} className=' ' >
                                    <NavLink className={`${item.data != null ?'has-mega-menu' : ''} font-[600] uppercase`} to={item.url}>{item.name}</NavLink>
                                    {
                                        item.data != null && <MegaMenu data={item.data}/>
                                    } 
                                    </li>     
                            }
                        )
                    }
                </ul>
                    </div>
                {/*Responsive nav*/}
                <div  id='responsive-menu' className={`z-[99999] w-full ${toggle ? 'left-0': 'left-[-100%]'} duration-100 md:hidden flex flex-col justify-center items-center gap-9 uppercase h-full fixed top-0 responsive-nav`}>
                    <div className=' gap-2 bg-white rounded-[10px] w-[80%] flex items-center overflow-hidden p-2'>
                    <FaSearch className=' text-black '/>
                        <input type="text" className='text-gray-500 flex-1 focus:outline-none h-full' placeholder='Search ...' />
                    </div>
                {
                        menuItems.map(
                            (item, index) => {
                                return <NavLink key={index} to={item.url}>
                                   <div className='text-black font-[600]'>{item.name}</div> 
                                    </NavLink>
                            }
                        )
                    }
                    <IoCloseSharp onClick={() => setToggle(false)}  className='md:hidden text-3xl' />
                </div>
                 {/*Responsive nav*/}
            </Container>
        </>
    )
}

const MegaMenu =({data}) => {
   return <div className={`z-[9999] absolute bg-white w-full left-0 top-[30px] p-3 shadow grid grid-cols-${data.length} mega-menu`}>
    {
        data.map(
            (d, i) => {
                return <div key={i}>
                    <h3 className='opacity-[0.5]'>{d.heading}</h3>
                    <div className='grid grid-cols-2'>
                        {
                            d.collection.map(
                                (c,i) => {
                                   return <div key={i} className='my-3'>
                                    <Link to={c.path}>{c.name}</Link>
                                    </div>
                                }
                            )
                        }
                    </div>
                    </div>
            }
        )
    }
    </div>
}