import './account.css'
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from 'react-toastify'
import axios from 'axios'
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';

const url = 'http://localhost:3000/api/v1'
const PF = 'http://localhost:3000/uploads/'

const Account = () => {

    const {user, dispatch} = useContext(Context)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({type: 'UPDATE_START'})

        const updatedUser = {
            userId: user._id, username, email, password
        }

        if (file) {
            const data = new FormData()
            const filename = file.name
            data.append('name', filename)
            data.append('file', file)
            updatedUser.profilePic = filename

            try {
                await axios.post(url + '/uploadImage', data)
            } catch (error) {
                console.log(error)
            }
        }

        try {
            const res = await axios.post(url + '/UserUpdateById/' + user._id , updatedUser)
            dispatch({type: 'UPDATE_SUCCESS', payload: res.data['data']})
            toast.success('Account Update Successfull.')
        } catch (error) {
            dispatch({type: 'UPDATE_FAILURE'})
            toast.error('Account Not Update !')
        }

    }



  return (
    <>
        <section className="accountInfo">
            <div className="container boxItems">
                <h1>Account Information</h1>
                <div className="content">
                    <div className="left">
                        <div className="img flexCenter">
                            <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
                            <label htmlFor="inputFile">
                                <IoIosAddCircleOutline className='icon' />
                            </label>
                            <input type="file" id='inputFile' onChange={(e) => setFile(e.target.files[0])} style={{display: 'none'}} />
                        </div>
                    </div>
                        <form className='right' onSubmit={handleSubmit}>
                            <label htmlFor="">Username</label>
                            <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="">Email</label>
                            <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="">Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit" className='button'>Update</button>
                        </form>
                </div>
            </div>
        </section>
    </>
  )
}

export default Account