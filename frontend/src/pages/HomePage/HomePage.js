import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { KEY } from "../../local_key";
import { ID } from "../../local_id";

const HomePage = () => {

  const [user] = useAuth();
  const [accessToken, setAccessToken] = useState([]);

  const getAuth = async () => {
    try {
      let response = await axios.post(`https://api.petfinder.com/v2/oauth2/token`, `grant_type=client_credentials&client_id=${ID}&client_secret=${KEY}`, {
        headers: {
          'Content-Type': `application/x-www-form-urlencoded`
        }
      });
      accessToken.push(response.data.access_token)
      console.log(response.data)
    }
    catch(error){
      console.log(error.message)
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
    </div>
  );
};

export default HomePage;
