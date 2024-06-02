import { Link } from 'react-router-dom'
import './error.css'

const Error = () => {
  return (
    <>
        <div className="not-found-container">
            <h1>404</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="home-link">Go back to Home</Link>
        </div>
    </>
  )
}

export default Error