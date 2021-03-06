import "./Footer.css";
import { useNavigate } from "react-router-dom";
import {MdOutlineFacebook} from "react-icons/md";
import {FaTwitter, FaSearch} from "react-icons/fa"

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <div className="footer">
        <ul>
          <li>
          <a href="http://www.Facebook.com" style={{color:"#3F4A3C"}}><span><MdOutlineFacebook/></span></a>
          <a href="http://www.twitter.com" style={{color:"#3F4A3C", paddingLeft:"1rem"}}><span><FaTwitter/></span></a>
          </li>
          <li>
            <button onClick={() => navigate("/shelters")} style={{marginLeft:"-0.6rem"}}>Find Shelters Near You!</button>
          </li>
          <li>
            <a href="/" style={{color:"#3F4A3C"}}><span><FaSearch/></span></a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
