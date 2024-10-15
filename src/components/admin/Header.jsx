import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const admin = useSelector(store => store.admin);
  const navigator = useNavigate();

  useEffect(
    () => {
      if(admin.data == null){
        navigator("/admin/admin-login");
      }
    }, [admin]
  )
  return (
    <div className='p-4 shadow text-right'>
        hello!
    </div>
  )
}
