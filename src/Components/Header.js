import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
        <Link to='/login'>Login</Link>
        |
        <Link to='/'>Home</Link>
    </div>
  )
}

export default Header