
import { useEffect, useState } from 'react';
import './card.css'
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt  } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
const PF = 'http://localhost:3000/uploads/'
const url = 'http://localhost:3000/api/v1'

const Card = () => {

    const [post, setPost] = useState([])
    const { search } = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(url + '/FindAllPost' + search)
                setPost(res.data['data'])

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [search])
    


  return (
    <>
        <section className="blog">
            <div className="container grid3">
                {post.map((item, i) => (
                    <div className="box boxItems" key={i}>
                        <div className="img">
                            {item.photo && (
                                <img src={ PF + item.photo} alt="" />
                            )}
                        </div>
                        <div className="details">
                            <div className="tag">
                                <AiOutlineTags className='icon' />
                                {/* <a href="/">#{item.category}</a> */}
                            </div>
                            <Link to={`/details/${item._id}`}>
                                <h3>{item.title}</h3>
                            </Link>
                            <p>{item.desc.slice(0, 180)}...</p>
                            <div className="date">
                                <AiOutlineClockCircle className='icon' /><label>{new Date(item.createdAt).toDateString()}</label>
                                <AiOutlineComment className='icon' /><label htmlFor="">27</label>
                                <AiOutlineShareAlt className='icon' /><label htmlFor="">SHARE</label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </>
  )
}

export default Card