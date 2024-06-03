
import { useEffect, useState } from 'react';
import axios from 'axios'
import Category from '../../components/category/Category'
import Card from '../../components/blog/Card'
import { useLocation } from 'react-router-dom';
const URL = 'http://localhost:3000/api/v1'

const Home = () => {

  // const [post, setPost] = useState([])
  // const { search } = useLocation()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //         const res = await axios.get(URL + '/FindAllPost' + search)
  //         setPost(res.data['data'])
  //     } catch (error) {
  //         console.log(error)
  //     }
  //   }
  //   fetchData()
  // }, [search])

  return (
    <div>
        <Category />
        <Card />
    </div>
  )
}

export default Home