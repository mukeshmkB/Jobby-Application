import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrMsg: false, errMsg: ''}

  onSubmitSuccess = jwtTkoken => {
    Cookies.set('jwt_token', jwtTkoken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showErrMsg: true, errMsg})
  }

  submitFormData = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }

    this.setState({username: '', password: ''})
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showErrMsg, errMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <div className="login-container">
          <form
            className="login-submit-container"
            onSubmit={this.submitFormData}
          >
            <div className="logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                className="logo-image"
              />
            </div>
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="input-value"
              onChange={this.onChangeName}
              value={username}
            />
            <br />
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="input-value"
              onChange={this.onChangePassword}
              value={password}
            />
            <button className="login-button" type="submit">
              Login
            </button>
            {showErrMsg && <p className="err-msg">{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
