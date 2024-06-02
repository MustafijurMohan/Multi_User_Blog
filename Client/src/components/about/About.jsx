import './about.css'
import john from '../../assets/images/about-4.jpg'
import jane from '../../assets/images/about-2.jpg'
import emily from '../../assets/images/about-1.png'

const About = () => {
  return (
    <>
        <div className="about-us">
            <h1>About Us</h1>
            <p>Welcome to our blogging platform!</p>
            <p>
                Our website is a community of writers and readers who share a passion for words and stories. We believe in the power of the written word to inform, inspire, and connect people from all walks of life.
            </p>
            <h2>Our Mission</h2>
            <p>
                Our mission is to provide a platform where anyone can share their thoughts, ideas, and stories with the world. Whether you're a seasoned writer or just starting out, we welcome you to join our community.
            </p>
            <h2>Meet Our Team</h2>
            <div className="team">
                <div className="team-member">
                <img src={john} alt="Team Member 1" />
                <h3>John Doe</h3>
                <p>Founder & CEO</p>
                </div>
                <div className="team-member">
                <img src={jane} alt="Team Member 2" />
                <h3>Jane Smith</h3>
                <p>Editor-in-Chief</p>
                </div>
                <div className="team-member">
                <img src={emily} alt="Team Member 3" />
                <h3>Emily Johnson</h3>
                <p>Community Manager</p>
                </div>
            </div>
            <h2>Join Us</h2>
            <p>
                Interested in contributing to our platform? <a href="/contact">Contact us</a> to learn more about becoming a writer or joining our team.
            </p>
        </div>
    </>
  )
}

export default About