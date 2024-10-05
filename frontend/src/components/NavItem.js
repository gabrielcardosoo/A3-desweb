import React from 'react'

function NavItem({link, text, actionOnClick}) {
  return (
    <li className="nav-item">
        <a 
            className="nav-link" 
            href={link}
            onClick={(e) => {
                if (actionOnClick) 
                    {
                        actionOnClick();
                    }
                }
            }
        >{text}
        </a>
    </li>
  )
}

export default NavItem