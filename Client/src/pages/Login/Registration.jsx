import './login.css'
import back from '../../assets/images/my-account.jpg'
import { useState } from 'react'
import axios from 'axios'
const URL = 'http://localhost:3000/api/v1'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

const Registration = () => {

    const [user, setUser] = useState({username: '', email: '', password: ''})
    const navigate = useNavigate()

    // Input Handle 
    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(URL + '/register', user)
            res.data['data'] && navigate('/login')
            toast.success('Registration Successfull.')
        } catch (error) {
            console.log(error)
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
                <h1 className='title'>Registration</h1>
                <form onSubmit={handleSubmit}>
                    <span>Username</span>
                    <input type="text" onChange={handleInput} value={user.username} name='username' required/>
                    <span>Email</span>
                    <input type="email" onChange={handleInput} value={user.email} name='email' required/>
                    <span>Password</span>
                    <input type="password" onChange={handleInput} value={user.password} name='password' required/>
                    <button type="submit" className='button'>Register</button>
                </form>
            </div>
        </section>
    </>
  )
}

export default Registration