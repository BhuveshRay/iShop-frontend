import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


export default function SideBar() {
  const [openItemIndex, setOpenItemIndex] = useState(null);
  const admin = useSelector(store => store.admin);

  // console.log(admin);

  const items = [
    {
      name: "Dashboard",
      url: "/admin",
      super_feature: false
    },
    {
      name: "Category",
      url: null,
      subitems: [
        {
          name: "Add",
          path: "/admin/category/add"
        },
        {
          name: "View",
          path: "/admin/category/view"
        }
      ],
      super_feature: false
    },
    {
      name: "Color",
      url: null,
      subitems: [
        {
          name: "Add",
          path: "/admin/color/add"
        },
        {
          name: "View",
          path: "/admin/color/view"
        }
      ],
      super_feature: false
    },
    {
      name: "Prodcut",
      url: null,
      subitems: [
        {
          name: "Add",
          path: "/admin/product/add"
        },
        {
          name: "View",
          path: "/admin/product/view"
        }
      ],
      super_feature: false
    },
    {
      name: "User",
      url: "/admin/user",
      super_feature: false
    },
    {
      name: "Orders",
      url: "/admin/order",
      super_feature: false
    },
    {
      name: "Transactions",
      url: "/admin/transactions",
      super_feature: true
    },
    {
      name: "AdminView",
      url: "/admin/view",
      super_feature: true
    },
  ]
  return (
    <div className='bg-gradient-to-b from-gray-700 from-40%  to-gray-400 to-90% ... min-h-[100vh]'>
      <div className='text-center text-2xl py-3 text-white'>ISHOP Admin</div>
      <hr />
      <ul>
        {
          items.map(
            (item, index) => {
              if (item.super_feature === true && admin.data?.is_super === false) {
                return null
              }
              return <li key={index} className='text-white px-3 my-1'>
                {
                  item.url != null
                    ? <Link to={item.url}>{item.name}</Link>
                    : <DropDown openItemIndex={openItemIndex} setOpenItemIndex={setOpenItemIndex} {...item} index={index} />
                }
              </li>

            }
          )
        }
      </ul>
    </div>
  )
}

const DropDown = ({ name, subitems, index, setOpenItemIndex, openItemIndex }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(
    () => {
      if (openItemIndex === index) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }, [openItemIndex, index, setOpenItemIndex]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(
    () => {
      if (isOpen === true) {
        setOpenItemIndex(index);
      }
    }, [isOpen, index, setOpenItemIndex]);

  return (
    <div >
      <button
        onClick={toggleMenu}
        className="text-white rounded focus:outline-none focus:bg-gray-700 flex"
      >
        {name}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="rounded shadow-lg bg-white ">
          {
            subitems.map(
              (sb, i) => {
                return <Link to={sb.path} key={i} className="block px-4 py-1 text-sm text-gray-800 "
                  role="menuitem">
                  {sb.name}
                </Link>
              }
            )
          }

        </div>
      )}
    </div>
  )

}