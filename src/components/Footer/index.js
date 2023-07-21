import './index.css'

import {
  FaInstagram,
  FaPinterestSquare,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa'

const Footer = () => (
  <div className="footer-box">
    <div className="footer-app-logo-box">
      <img
        src="https://res.cloudinary.com/diinjqsug/image/upload/v1688639688/Frame_275_tbwnjp.svg"
        alt="website-footer-logo"
        className="footer-app-logo"
      />
      <h1 className="footer-app-title">Tasty Kitchens</h1>
    </div>
    <p className="footer-caption-text">
      The only thing we are serious about is food. Contact us on
    </p>
    <p className="footer-caption-text">Contact Us</p>
    <div className="social-media-icons-box">
      <FaPinterestSquare
        className="social-media-icon"
        testid="pintrest-social-icon"
      />
      <FaInstagram
        className="social-media-icon"
        testid="instagram-social-icon"
      />
      <FaTwitterSquare
        className="social-media-icon"
        testid="twitter-social-icon"
      />
      <FaFacebookSquare
        className="social-media-icon"
        testid="facebook-social-icon"
      />
    </div>
  </div>
)

export default Footer
