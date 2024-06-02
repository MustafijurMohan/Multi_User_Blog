
import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <>
        <footer className='boxItems flex'>
            <div className="container">
                <p>Mustafijur Mohan - All right reserved</p>
            </div>
            <div className="social">
                <BsFacebook className="icon" />
                <RiInstagramFill className="icon" />
                <AiFillTwitterCircle className="icon" />
                <AiFillLinkedin className="icon" />
            </div>
        </footer>
    </>
  )
}

export default Footer