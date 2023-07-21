import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    // isShowPassword: false,
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUserName = e => {
    this.setState({username: e.target.value})
  }

  onChangePassword = e => {
    this.setState({password: e.target.value})
  }

  //   showAndHidePassword = () => {
  //     this.setState(pre => ({isShowPassword: !pre.isShowPassword}))
  //   }

  successLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failedLogin = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const apiLoginUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiLoginUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.successLogin(data.jwt_token)
    } else {
      this.failedLogin(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showErrorMsg, errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="form-container">
          <form className="form" onSubmit={this.onSubmitForm}>
            <img
              src="https://res.cloudinary.com/diinjqsug/image/upload/v1688635612/Frame_274_a4kbyj.svg"
              alt="website logo"
              className="logo"
            />
            <h1 className="heading">Testy Kitchens</h1>
            <h2 className="login-heading">Login</h2>
            <label className="label" htmlFor="USERNAME">
              USERNAME
            </label>
            <input
              className="input"
              type="text"
              id="USERNAME"
              value={username}
              onChange={this.onChangeUserName}
              placeholder="USERNAME"
            />
            <label className="label" htmlFor="PASSWORD">
              PASSWORD
            </label>
            <input
              className="input"
              type="password"
              id="PASSWORD"
              value={password}
              onChange={this.onChangePassword}
              placeholder="PASSWORD"
            />
            {showErrorMsg ? <p className="erroe-msg">*{errorMsg}</p> : null}
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
        <div className="img-container">
          <img
            src="https://res.cloudinary.com/diinjqsug/image/upload/v1689008299/Rectangle_1456_2x_lwvgif.png"
            alt="website login"
            className="image"
          />
        </div>
      </div>
    )
  }
}

export default Login
