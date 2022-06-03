// General Imports
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { KEY } from "./local_key";
import { ID } from "./local_id";
import { useNavigate } from "react-router-dom";
// import useAuth from "./hooks/useAuth";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import AnimalDetailsPage from "./pages/AnimalDetailsPage/AnimalDetailsPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
// import PrivateRoute from "./utils/PrivateRoute";

function App() {

  const [accessToken, setAccessToken] = useState("");
  const [results, setResults] = useState([]);
  const [animalDetails, setAnimalDetails] = useState([]);
  const navigate = useNavigate();
  // const [token] = useAuth();

  const getAuth = async () => {
    try {
      let response = await axios.post(`https://api.petfinder.com/v2/oauth2/token`, `grant_type=client_credentials&client_id=${ID}&client_secret=${KEY}`, {
        headers: {
          'Content-Type': `application/x-www-form-urlencoded`
        }
      });
      setAccessToken(response.data.access_token)
    }
    catch(error){
      console.log(error.message)
    }
  };

  const getResults = async (props) => {
    try {
      let apiUrl = `https://api.petfinder.com/v2/animals?type=${props.animalType}&location=${props.zipCode}&distance=50&status=adoptable&limit=100`
      const kidsApi = `&good_with_children=${props.kids}`
      const pottyApi = `&house_trained=${props.houseTrained}`
      const neuteredApi = `&spayed_neutered=${props.spayedNeutered}`
      if(props.kids !== ""){
        apiUrl += kidsApi
      }
      if(props.houseTrained !== ""){
        apiUrl += pottyApi
      }
      if(props.spayedNeutered !== ""){
        apiUrl += neuteredApi
      }
        let response = await axios.get(`${apiUrl}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setResults(response.data.animals)
        if(response.data.animals.length === 0){
          alert("No results found.")
        }
        else{
        navigate("/results")
      }
      }
    catch(error){
      console.log(error.message)
    }
  }

  const getDetails = (props) => {
    setAnimalDetails(props.animal)
    navigate("/details")

  }

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
              <HomePage getResults={getResults}/>
          }
        />
        <Route path="/details" element={<AnimalDetailsPage animalDetails={animalDetails}/>}/>
        <Route path="/results" element={<ResultsPage results={results} getDetails={getDetails}/>}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
