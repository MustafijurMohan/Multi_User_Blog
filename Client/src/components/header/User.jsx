import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiImageAddLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { Context } from '../../context/Context';

const PF = 'http://localhost:3000/uploads/'

const User = () => {

  const {user, dispatch} = useContext(Context)
  const navigate = useNavigate()

  const [profileOpen, setProfileOpen] = useState(false)

  const close = () => {
    setProfileOpen(false)
  }

  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
    navigate('/login')
  }

  return (
    <>
      <div className="profile">
        {user ? 
        (
          <>
            <button className="img" onClick={() => setProfileOpen(!profileOpen)}>
              <img src={PF + user.profilePic} alt="img" />
            </button>
            {profileOpen && (
              <div className="openProfile boxItems" onClick={close}>
                <Link to='/account'>
                  <div className="image">
                    <div className="img">
                      <img src={PF + user.profilePic} alt="img" />
                    </div>
                    <div className="text">
                      <h4>{user.username}</h4>
                      <label>Los Angeles, CA</label>
                    </div>
                  </div>
                </Link>
                <Link to='/create'>
                  <button className="box">
                    <RiImageAddLine className='icon' />
                    <h4>Create Post</h4>
                  </button>
                </Link>
                <Link to='/login'>
                  <button className="box">
                    <IoSettingsOutline className='icon' />
                    <h4>My Account</h4>
                  </button>
                </Link>
                <button className="box" onClick={handleLogout}>
                  <BiLogOut className='icon' />
                    <h4>Log Out</h4>
                </button>
              </div>
            )}
            
          </>
        ) : (
          <Link to='/login'>
            <button>My Account</button>
          </Link>
          
        )}
        
      </div>
    </>
  )
}

export default User