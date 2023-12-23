import './index.css'

const NotFound = () => (
  <div className="NotFound-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="notFound-image"
      alt="not found"
    />
    <h1 className="noFound-title-text ">Page Not Found</h1>
    <p className="no-found-msg">
      we are sorry, the page your requested could not be found
    </p>
  </div>
)
export default NotFound
