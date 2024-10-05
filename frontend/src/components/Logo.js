import React from 'react'

export const Logo = ({path_logo}) => {
  return (
    <a className="navbar-brand" href="javascript:void(0);"> 
        <img src={path_logo} alt="Logo" width="200" height="200" className="logo" />
    </a>    
  )
}

export default Logo
