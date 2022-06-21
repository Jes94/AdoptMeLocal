import React from "react";
import { useState } from "react";
import { GKEY } from "../../local_google_key";
import "./DisplayShelters.css"

const DisplayShelters = () => {
    const [zipCode, setZipCode] = useState("")

    return (
    <div>
        <div className="form-group">
            <input id="zip" type="text" placeholder="Zip Code" value={zipCode} onChange={(event) => setZipCode(event.target.value)}/>
            <span>   </span>
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