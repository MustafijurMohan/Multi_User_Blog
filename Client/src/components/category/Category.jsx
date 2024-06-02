import { category } from '../../assets/data/data'
import './category.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";



const SampleNextArrow = (props) => {
    const {onClick} = props
    return (
        <div className="control-btn" onClick={onClick}>
            <button className='next'>
                <MdNavigateNext className='icon' />
            </button>
        </div>
    )
}

const SamplePrevArrow = (props) => {
    const {onClick} = props
    return (
        <div className="control-btn" onClick={onClick}>
            <button className='prev'>
                <MdNavigateBefore className='icon' />
            </button>
        </div>
    )
}

const Category = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint:800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    };




  return (
    <>
        <section className="category">
            <div className="container">
            <Slider {...settings}>
                {category.map((item) => (
                    <div className="boxes" key={item.id}>
                        <div className="box" >
                            <img src={item.cover} alt="" />
                                <div className="overlay">
                                    <h4>{item.category}</h4>
                                    <p>{item.title}</p>
                                </div>
                        </div>
                    </div>
                ))}
                </Slider>
            </div>
        </section>
    </>
  )
}

export default Category


