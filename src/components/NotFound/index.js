import './index.css'

const NotFound = () => (
  <div className="not-found-con">
    <div className="not-found-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-head">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound
