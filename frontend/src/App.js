// General Imports
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { KEY } from "./local_key";
import { ID } from "./local_id";
import { useNavigate } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import AnimalDetailsPage from "./pages/AnimalDetailsPage/AnimalDetailsPage";
import SheltersPage from "./pages/SheltersPage/SheltersPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import DirectionsPage from "./pages/DirectionsPage/DirectionsPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";


function App() {

  const [accessToken, setAccessToken] = useState("");
  const [results, setResults] = useState([]);
  const [animalDetails, setAnimalDetails] = useState([]);
  const [shelterInfo, setShelterInfo] = useState({})
  const navigate = useNavigate();

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
        console.log(response.data.animals)
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

  const getShelterInfo = async (id) => {
    try {
        let response = await axios.get(`https://api.petfinder.com/v2/organizations/${id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log(response.data)
        setShelterInfo(response.data.organization)
        let poFilter = "PO"
        if (response.data.organization.address.address1 !== null && !response.data.organization.address.address1.includes(poFilter)){
          navigate("/directions")
        }
        else{
          alert("No physical address was found for this shelter")
        }
    }
    catch(error){
        console.log(error.message)
    }
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
        <Route path="/directions" element={<DirectionsPage shelterInfo={shelterInfo}/>}/>
        <Route path="/favorites" element={<FavoritesPage getShelterInfo={getShelterInfo}/>}/>
        <Route path="/shelters" element={<SheltersPage/>}/>
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
