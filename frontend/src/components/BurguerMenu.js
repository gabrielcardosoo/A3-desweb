import React from 'react'

function BurguerMenu({toggleMenu, isMenuOpen}) {

    
  return (
        <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen ? "true" : "false"}
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

    )

}

export default BurguerMenu