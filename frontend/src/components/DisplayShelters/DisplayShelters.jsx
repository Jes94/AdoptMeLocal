// import axios from "axios";
import React from "react";
import { useState } from "react";
import { GKEY } from "../../local_google_key";
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import "./DisplayShelters.css"

const DisplayShelters = () => {
    const [zipCode, setZipCode] = useState("")
// The below works for getting zip code, so on so forth but over complicated the matter when going for MVP. 
//
//     const [lat, setLat] = useState(37.0902)
//     const [lng, setLng] = useState(-95.7129)

//     const getLatLon = async () => {
//         try {
//             let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?&key=${GKEY}&components=postal_code:${zipCode}`)
//             setLat(response.data.results[0].geometry.location.lat)
//             setLng(response.data.results[0].geometry.location.lng)
//         }
//         catch (error){
//             console.log(error.message)
//         }
//     }

// // Get animal shelters near users lat/lng
// // Almost Had this working but had issues with CORS using axios, switched to Google Maps API to call but due to limited time switching to iFrame method.

// // Load a basic map 
//     const { isLoaded } = useJsApiLoader({googleMapsApiKey: GKEY, libraries: ['places'],})

// // Center the map at users lat/lng default is center of U.S. & Go through each index making a marker.
//     function Map() {
//         return <GoogleMap zoom={7} center={{lat: parseFloat(lat),lng: parseFloat(lng)}} mapContainerClassName="map-container">
//         </GoogleMap>;
//     }

// // If map is not done loading display a loading status. Otherwise return the normal page.
//     if(!isLoaded) return <div>Loading...</div>;


    return (
    <div>
        <div className="form-group">
            <input id="zip" type="text" placeholder="Zip Code" value={zipCode} onChange={(event) => setZipCode(event.target.value)}/>
            <span>   </span>
            {/* <button className="btn btn-primary btn-sm" onClick={getLatLon}>Submit</button> */}

        </div>
        <iframe
        title="iframe"
        width="600"
        height="450"
        style={{border:"0", paddingTop:"1em"}}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/search?key=${GKEY}
            &q=Animal+Shelters,${zipCode}`}>
        </iframe>
    </div>
    
    )
}

export default DisplayShelters;