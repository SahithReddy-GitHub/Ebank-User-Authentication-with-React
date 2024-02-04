import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '142420',
    password: '231225',
    errorMsg: '',
    showSubmitError: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = msg => {
    console.log(msg)
    this.setState({errorMsg: msg, showSubmitError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {
      user_id: username,
      pin: password,
    }
    const loginUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg">
        <div className="cardLogin">
          <div className="LoginImgCon">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="imgLogin"
            />
          </div>
          <div className="login-con">
            <h1 className="welHead">Welcome Back!</h1>
            <form className="login-form" onSubmit={this.onSubmitForm}>
              <div className="form-item">
                <label className="login-label" htmlFor="user-name">
                  User ID
                </label>
                <br />
                <input
                  placeholder="Enter User ID"
                  type="text"
                  id="user-name"
                  value={username}
                  className="login-input"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="form-item">
                <label className="login-label" htmlFor="password">
                  PIN
                </label>
                <br />
                <input
                  type="password"
                  placeholder="Enter PIN"
                  id="password"
                  value={password}
                  className="login-input"
                  onChange={this.onChangePassword}
                />
              </div>
              <button className="login-btn" type="submit">
                Login
              </button>
              {showSubmitError && (
                <p className="login-error">{`* ${errorMsg}`}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
