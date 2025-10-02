import React from 'react'
import {assets} from '../assets/assets.js'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="logo" />
        <img className='profile' src={assets.profile_image} alt="img" />
    </div>
  )
}

export default Navbar