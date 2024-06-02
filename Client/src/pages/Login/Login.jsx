import './login.css'
import back from '../../assets/images/my-account.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useRef } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'
import { toast } from 'react-toastify'

const URL = 'http://localhost:3000/api/v1'

const Login = () => {

   const userRef = useRef()
   const passwordRef = useRef()
   const {dispatch, isFetching} = useContext(Context)
    const navigate = useNavigate()


   const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({type: 'LOGIN_START'})
    try {
        const res = await axios.post(URL + '/login', {
            username: userRef.current.value,
            password: passwordRef.current.value,
        })
        dispatch({type: 'LOGIN_SUCCESS', payload: res.data['data']})
        toast.success('Login Successfull.')
        navigate('/')
    } catch (error) {
        dispatch({type: 'LOGIN_FAILURE'})
        toast.error('Something went wrong!')
    }
   }


  return (
    <>
        <section className="login">
            
            <div className="container">
                
                <div className="backImg">
                    <img src={back} alt="Image" />
                </div>
                <h1 className='title'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <span>Username</span>
                    <input type="text" ref={userRef} required/>
                    <span>Password</span>
                    <input type="password" ref={passwordRef} required/>
                    <button type="submit" className='button'>Login</button>
                    <Link to='/registration' className='link'>Register</Link>
                </form>
            </div>
        </section>
    </>
  )
}

export default Login