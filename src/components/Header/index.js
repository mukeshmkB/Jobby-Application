import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-header-container">
      <div className="header-content-container-sm">
        <Link className="nav-item-link-sm" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="nav-logo-sm"
            alt="website logo"
          />
        </Link>
        <ul className="nav-item-container-sm">
          <li className="nav-item">
            <Link className="nav-item-link-sm" to="/">
              <AiFillHome size="20" color="#f8fafc" />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-item-link-sm" to="/jobs">
              <BsBriefcaseFill size="20" color="#f8fafc" />
            </Link>
          </li>
        </ul>

        <button
          className="logout-button-sm"
          onClick={onClickLogout}
          id="logout-btn"
          type=" button"
          aria-label="logout"
        >
          <FiLogOut size="20" color="#f8fafc" />
        </button>
      </div>
      <div className="header-content-container">
        <Link className="nav-item-link-sm" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </Link>
        <ul className="nav-item-container">
          <li className="nav-item">
            <Link className="nav-item-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-item-link" to="/jobs">
              {' '}
              Jobs
            </Link>
          </li>
        </ul>

        <button
          className="logout-button"
          type=" button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
export default withRouter(Header)
