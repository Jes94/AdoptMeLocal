import "./Footer.css";
import { useHref, useNavigate } from "react-router-dom";
import {MdOutlineFacebook} from "react-icons/md";
import {FaTwitter, FaSearch} from "react-icons/fa"

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <div className="footer">
        <ul>
          <li>
          <a href="http://www.Facebook.com" style={{color:"black"}}><span><MdOutlineFacebook/></span></a>
          <a href="http://www.twitter.com" style={{color:"black", paddingLeft:"1rem"}}><span><FaTwitter/></span></a>
          </li>
          <li>
            <button onClick={() => navigate("/shelters")} style={{marginLeft:"-1rem"}}>Find Shelters Near You!</button>
          </li>
          <li>
            <a href="/" style={{color:"black"}}><span><FaSearch/></span></a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
