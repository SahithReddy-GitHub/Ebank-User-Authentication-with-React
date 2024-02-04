import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Home extends Component {
  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/ebank/login" />
    }

    return (
      <div className="bgCon">
        <div className="navbar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="webLogo"
          />
          <button type="button" className="bankBtn" onClick={this.onLogout}>
            Logout
          </button>
        </div>
        <div className="bankCard">
          <h1 className="bankHead">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="cardImg"
          />
        </div>
      </div>
    )
  }
}

export default Home
