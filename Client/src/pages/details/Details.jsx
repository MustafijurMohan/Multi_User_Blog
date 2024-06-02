import './details.css'
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import { toast } from 'react-toastify'
const url = 'http://localhost:3000/api/v1'
const PF = 'http://localhost:3000/uploads/'

const Details = () => {

    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
//    console.log(location.pathname.split('/')[2])
    const id = location.pathname.split('/')[2]

    const [post, setPost] = useState({})
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [updateMode, setUpdateMode] = useState(false)


    // Single Post
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(url + '/FindPostById/' + id)
                setPost(res.data['data'])
                setTitle(res.data['data']['title'])
                setDesc(res.data['data']['desc'])
            } catch (error) {
                console.log(error)
            }
        }
        fetchPost()
    }, [id])

// Update Post
    const handleUpdate = async (id) => {
        try {
            await axios.post(url + `/PostUpdateById/` + id, {
                username: user.username, title, desc
            })
            setUpdateMode(false)
            toast.success('Post Update Successfull.')
            navigate(0)
        } catch (error) {
            toast.error('Something went wrong!')
            console.log(error)
            
        }
    }
    
// Delete Post
const handleDelete = async (id) => {
    try {
        await axios.delete(url + '/PostDeleteById/' + id, {
            data: {username: user.username}
        })
        toast.success('Post Delete Successfull.')
        navigate('/')
    } catch (error) {
        toast.error('Post Not Delete .')
        console.log(error)
    }
}


  return (
    <>
        <section className="detailsPost">
            <div className="detailsPostWrapper">
                {post.photo && (
                    <img src={PF + post.photo} alt="" className='detailsPostImg' />
                )}
                {updateMode ? (
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='updateInput' />
                ):(
                    <h1 className="detailsPostTitle">{post.title}
                        {post.username === user.username && (
                            <div className="detailsPostEdit">
                                <FaEdit className='detailsPostIcon' onClick={() => setUpdateMode(true)} />
                                <FaTrashAlt className='detailsPostIcon' onClick={handleDelete.bind(this, post._id)} />
                            </div>
                        )}
                    </h1>
                )}
                
                <div className="detailsPostInfo">
                    <span>
                        Author: 
                        <Link to={`/?user=${post.username}`}>
                            <b className='detailsPostAuthor'>{post.username}</b>
                        </Link>
                    </span>
                    <span>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? (
                    <textarea cols='30' rows='10' value={desc} onChange={(e) => setDesc(e.target.value)} className='updateInput'></textarea>
                ) : (
                    <p className='detailsPostDesc'>{post.desc}</p>
                )}
                {updateMode && (
                    <button type="submit" onClick={handleUpdate.bind(this, post._id)} className='button' style={{float: 'right'}}>Update</button>
                )}
                
            </div>
        </section>
    </>
  )
}

export default Details