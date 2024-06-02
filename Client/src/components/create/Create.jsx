import {  useContext, useState } from 'react';
import './create.css'
import { IoIosAddCircleOutline } from "react-icons/io";
import { Context } from '../../context/Context';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const url = 'http://localhost:3000/api/v1'


const Create = () => {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null)
    const { user } = useContext(Context)
    const navigate = useNavigate()

    // Form Submit
const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
        username: user.username, title, desc
    }

    if (file) {
        const data = new FormData()
        const filename = file.name
        data.append('name', filename)
        data.append('file', file)
        newPost.photo = filename

        try {
            await axios.post(url + '/uploadImage', data)
        } catch (error) {
            console.log(error)
        }
    }
        try {
            const res = await axios.post(url + '/PostCreate', newPost)
            navigate('/details/' + res.data['data']._id)
            toast.success('Post Create Successfull.')
        } catch (error) {
            toast.error('Something went wrong!')
            console.log(error)
        }
}


  return (
    <>
        <section className="newPost">
            <div className="container boxItems">
                <div className="img">
                    {file && (
                        <img src={URL.createObjectURL(file)} alt="" />
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="inputfile flexCenter">
                        <label htmlFor="inputfile">
                            <IoIosAddCircleOutline className='icon' />
                        </label>
                        <input type="file" id='inputfile' onChange={(e) => setFile(e.target.files[0])}  style={{display: 'none'}} />
                    </div>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder='Title'  />
                    <textarea placeholder='Tell Your Story...'  onChange={(e) => setDesc(e.target.value)} cols="30" rows="10"></textarea>
                    <button type="submit" className='button'>Create Post</button>
                </form>
            </div>
        </section>
    </>
  )
}

export default Create