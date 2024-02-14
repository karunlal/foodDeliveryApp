import { LOGO_URL } from '../utils/constants'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'
import UserContext from './userContext'

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState('Login')

  const onlineStatus = useOnlineStatus()

  const { loggedInUser } = useContext(UserContext)
  console.log(loggedInUser)

  return (
    <div className="flex justify-between bg-purple-200 shadow-lg sm:bg-yellow-100 lg:bg-green-200 ">
      <div className="logo-container">
        <img className="w-24" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">
            {onlineStatus ? <h6>Status:Online</h6> : <h6>Status:Offline</h6>}
          </li>
          <li className="px-4">
            <Link to="./">Home</Link>
          </li>
          <li className="px-4">
            <Link to="./About">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="./Contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="./Grocery"> Grocery </Link>
          </li>
          <li className="px-4">Cart</li>
          <button
            className="login"
            onClick={() => {
              btnNameReact === 'Login'
                ? setBtnNameReact('Logout')
                : setBtnNameReact('Login')
            }}
          >
            {btnNameReact}
          </button>
          <li className="px-4 font-bold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  )
}

export default Header
