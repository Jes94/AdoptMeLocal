// General Imports
import { useMemo, useState, useEffect, useRef } from "react";
import axios from "axios";

// Google Maps Imports
import { GoogleMap, useLoadScript, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";

// API Keys
import { GKEY } from "../../local_google_key";

// Style Import
import './DirectionsPage.css';


const DirectionsPage = ({ shelterInfo }) => {

    const [lat, setLat] = useState(37.0902)
    const [lng, setLng] = useState(-95.7129)
    const shelterAddress= shelterInfo.address.address1.replace(/\s/g, "%20")
    const shelterCity = "%20" + shelterInfo.address.city.replace(/\s/g, "%20")
    const shelterState = "%20" + shelterInfo.address.state.replace(/\s/g, "%20")
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    // const [routeSteps, setRouteSteps] = useState([])
    const address = shelterAddress+shelterCity+shelterState
    const origin = useRef()
    const [ libraries ] = useState(['places']);
// Only update center if lat or lng changes
    const center = useMemo(() =>  ({lat: lat, lng: lng}), [lat,lng])

// Get the Lat & Lon of the Shelter
    const getLatLon = async () => {
        try {
            let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GKEY}`)
            setLat(response.data.results[0].geometry.location.lat)
            setLng(response.data.results[0].geometry.location.lng)
        }
        catch (error){
            console.log(error.message)
        }
    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: `${GKEY}`,
        libraries,
      });

    useEffect(() => {
        getLatLon();
    }, []);


// Get the route
    const [directions, setDirections] = useState(null)
    const [distance, setDistance] = useState('')
    const [tripLength, setTripLength] = useState('')

    const calculateRoute = async () => {
        if (origin.current.value === ''){
        return
        }
        // eslint-disable-next-line
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: origin.current.value,
            destination: center,
            // eslint-disable-next-line
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirections(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setTripLength(results.routes[0].legs[0].duration.text)
        // setRouteSteps(results.routes[0].legs[0].steps)
    }

// Check if the map has loaded, and display the correct option depending on the state

    if (!isLoaded) return (
    <div>Loading...</div>
    )

    return (
        <div className="container">
                <div className="input-group" style={{justifyContent:"center", marginBottom: "1rem"}}>
                    <div>
                    <Autocomplete>
                        <input type='text' placeholder='Your Address' ref={origin} style={{width:"25rem"}}/>
                    </Autocomplete>
                    </div>
                    <div>
                    <button type='submit' className="btn btn-primary btn-sm" onClick={calculateRoute} style={{background: "#008000", border: "#008000", maxWidth:"3rem", maxHeight:"30px", marginLeft: "5px"}}>Go</button>
                    </div>
                </div>
                <div><p>{shelterInfo.address.address1}, {shelterInfo.address.city}, {shelterInfo.address.state}</p></div>
                {directions ? (
                <div className="row-group" style={{justifyContent:"center", marginBottom: "1rem"}}>
                    <p>Distance: {distance}     Duration: {tripLength}</p>
                </div>
                ): (<p></p>)}
                <div className="row">
                    <GoogleMap center={center} zoom={10} mapContainerClassName="map-container" options={{streetViewControl: false, mapTypeControl: false, fullscreenControl: false}} onLoad={map => setMap(map)}>
                        {directions && (
                            <DirectionsRenderer directions={directions} />
                        )}
                    </GoogleMap>
                </div>
                {/* {directions ? (
                routeSteps.map((step, index) => {
                    return (
                        <div key={index}>
                        <p>{step.instructions}   for {step.distance.text}</p>
                        </div>
                    )
                }
                )):(
                <div></div>
                )} */}
        </div>
    )
}


export default DirectionsPage