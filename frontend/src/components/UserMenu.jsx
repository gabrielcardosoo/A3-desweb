import React from 'react'

const UserMenu = ({stateLogin}) => {
  return (
    
    <ul className="dropdown-menu show" style={{ position: 'absolute', right: 0 }}>
        {stateLogin ? (
            <li>
            <a className="dropdown-item" href="/profile">Perfil</a>
            <a className="dropdown-item" href="/logout">Sair</a>
            <a className="dropdown-item" href='/settings'>Configurações</a>
          </li>
        ) : (
          <li>
            <a className="dropdown-item" href="/login" >Entrar </a>
          </li>
        )}
    </ul>
  )
}

export default UserMenu