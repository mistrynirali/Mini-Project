import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/diinjqsug/image/upload/v1688635612/Frame_274_a4kbyj.svg"
          alt="website logo"
          className="website-logo"
        />
        <h1 className="heading">Testy Kitchens</h1>
      </div>
      <div className="button-container">
        <ul className="list-container">
          <Link to="./" className="link">
            <li className="home-text">Home</li>
          </Link>
          <Link to="./cart" className="link">
            <li className="cart-text">Cart</li>
          </Link>
        </ul>

        <button type="button" className="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
export default withRouter(Header)
