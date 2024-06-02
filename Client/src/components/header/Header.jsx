import './header.css'
import logo from '../../assets/images/logo.png'
import { nav } from '../../assets/data/data'
import { Link } from 'react-router-dom'
import User from './User'

const Header = () => {

    window.addEventListener("scroll", function () {
        const header = this.document.querySelector(".header")
        header.classList.toggle("active", this.window.scrollY > 100)
      }) 



  return (
    <>
        <header className="header">
            <div className="container flex">
                <div className="logo">
                    <Link to='/'>
                        <img src={logo} alt="logo" width='30px' />
                    </Link>
                </div>
                <nav>
                    <ul>
                        {nav.map((link) => (
                            <li key={link.id}>
                                <Link to={link.url}>{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="account flexCenter">
                    <User />
                </div>
            </div>
        </header>

    </>
  )
}

export default Header