import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import './App.css'
import Header from './components/header/Header'
import Home from './pages/home/Home'
import Login from './pages/Login/Login'
import Registration from './pages/Login/Registration'
import Account from './pages/account/Account'
import Create from './components/create/Create'
import Footer from './components/footer/Footer'
import Details from './pages/details/Details'
import Contact from './components/contact/Contact'
import About from './components/about/About'
import Blog from './components/blog/Blog';
import Error from './pages/Error/Error';


const App = () => {


  return (
    <>
      <Router>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account' element={<Account />} />
          <Route path='/create' element={<Create />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/registration' element={<Registration/>} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
