import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './style/User.css';

function User({isLoggedIn, handleLogin, userImage}) {
  return (
    <div className="user-component">
      {isLoggedIn ? (
        <div>
          <img className='user-icon-logged' src={userImage} onClick={handleLogin} alt="User"/>
        </div>
      ) : (
        <div>
          <FontAwesomeIcon className='user-icon-logout' icon={faUser} onClick={handleLogin} alt="User"/>
        </div>
      )}
    </div>
  );
}

export default User;
