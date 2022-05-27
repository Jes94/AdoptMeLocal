import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { KEY } from "../../local_key";
import { ID } from "../../local_id";

const HomePage = () => {

  const [user] = useAuth();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    getAuth();
  }, []);

  const getAuth = async () => {
    try {
      let response = await axios.post(`https://api.petfinder.com/v2/oauth2/token`, `grant_type=client_credentials&client_id=${ID}&client_secret=${KEY}`, {
        headers: {
          'Content-Type': `application/x-www-form-urlencoded`
        }
      });
      setAccessToken(response.data.access_token)
      console.log(accessToken)
    }
    catch(error){
      console.log(error.message)
    }
  };



  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
    </div>
  );
};

export default HomePage;
