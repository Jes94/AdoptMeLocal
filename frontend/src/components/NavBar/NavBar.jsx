import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li>
          <button onClick={() => navigate("/favorites")}>Favorites</button>
        </li>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none"}}>
            <h4><span style={{color:"black"}}>Adopt</span><span style={{color:"green"}}>Me</span><span style={{color:"black"}}>Local</span></h4>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
