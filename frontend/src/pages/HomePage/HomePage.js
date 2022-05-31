import React, { useState, useEffect } from "react";
import axios from "axios";
import { KEY } from "../../local_key";
import { ID } from "../../local_id";
import { Col, Row } from "react-bootstrap";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./HomePage.css";

const HomePage = () => {

  const [accessToken, setAccessToken] = useState("");
  const [results, setResults] = useState({})

  const getAuth = async () => {
    try {
      let response = await axios.post(`https://api.petfinder.com/v2/oauth2/token`, `grant_type=client_credentials&client_id=${ID}&client_secret=${KEY}`, {
        headers: {
          'Content-Type': `application/x-www-form-urlencoded`
        }
      });
      setAccessToken(response.data.access_token)
      console.log(response.data)
    }
    catch(error){
      console.log(error.message)
    }
  };

  const getResults = async (props) => {
    try {
      let response = await axios.get(`https://api.petfinder.com/v2/animals?type=${props.animalType}&location=${props.zipCode}&distance=50`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setResults(response.data)
      console.log(response.data)
    }
    catch(error){
      console.log(error.message)
    }
  }

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <div className="container">
      <Row>
      <Col></Col>
      <Col>
      <img src="https://i.imgur.com/5u4ATsD.jpeg" alt="Cat and Dog" style={{"maxHeight":"25rem", "maxWidth":"25rem", "alignContent":"center"}}></img>
      </Col>
      <Col></Col>
      </Row>
      <Row>
        <SearchBar searchParams={getResults}/>
      </Row>
    </div>
  );
};

export default HomePage;
