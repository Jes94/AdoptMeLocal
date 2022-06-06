import { useState } from "react"
import "./SearchBar.css";
import { Col, Row, Container } from "react-bootstrap";

const SearchBar = (props) => {
    const [animalType, setAnimalType] = useState("dog");
    const [zipCode, setZipCode] = useState("");
    const [goodWithKids, setGoodWithKids] = useState("");
    const [houseTrained, setHouseTrained] = useState("");
    const [spayedNeutered, setSpayedNeutered] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        props.searchParams({zipCode: zipCode, animalType: animalType, kids: goodWithKids, houseTrained: houseTrained, spayedNeutered: spayedNeutered})
    };

    const toggleKids = () => {
        if (goodWithKids === "") {
            setGoodWithKids("true")
        }
        else if (goodWithKids === "true"){
            setGoodWithKids("")
        }
        else{
            setGoodWithKids("true")
        }
    }

    const togglePottyTrained = () => {
        if (houseTrained === "") {
            setHouseTrained("true")
        }
        else if (houseTrained === "true"){
            setHouseTrained("")
        }
        else{
            setHouseTrained("true")
        }
            
    }

    const toggleSpayedNeutered = () => {
        if (spayedNeutered === "") {
            setSpayedNeutered("true")
        }
        else if (spayedNeutered === "true"){
            setSpayedNeutered("")
        }
        else{
            setSpayedNeutered("true")
        }
            
    }


    return (
        <Container className="border-box">
            <Row xs={'auto'} className="justify-content-center">
                <Col sm={2.5}>
                    <div className="form-group">
                    <label htmlFor="animalTypes">I'm looking for a </label>
                        <span>  </span>
                        <select name="animalTypes" id="animalTypes" required="True" onChange={(event) => setAnimalType(event.target.value)}>
                            <optgroup label="Please choose an animal.">
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                            </optgroup>
                        </select>
                        </div>
                </Col>
                <Col sm={2.5}>
                    <div className="form-group">
                    <label htmlFor="zip">Near:</label>
                    <span>  </span>
                    <input id="zip" type="text" placeholder="Zip Code" value={zipCode} onChange={(event) => setZipCode(event.target.value)}/>
                    </div>
                </Col>
                {/* <Col sm={1}>
                    <button type="button" className="btn btn-primary btn-sm" onClick={handleSubmit}>Search</button>
                </Col> */}
            </Row>
            <Row xs={'auto'} className="justify-content-center">
                <Col>
                <div className="form-group">
                <label htmlFor="kidsCheck">Good With Kids</label>
                <span>  </span>
                <input type="checkbox" id="kidsCheck" onClick={toggleKids}/>
                </div>
                </Col>
                <Col>
                <div className="form-group">
                <label htmlFor="pottyTrained">House Trained </label>
                <span>  </span>
                <input type="checkbox" id="pottyTrained" onClick={togglePottyTrained}/>
                </div>
                </Col>
                <Col>
                <div className="form-group">
                <label htmlFor="spayedCheck">Spayed/Neutered </label>
                <span>  </span>
                <input type="checkbox" id="spayedCheck" onClick={toggleSpayedNeutered}/>
                </div>
                </Col>
            </Row>
            <Row xs={'auto'} className="justify-content-center">
        <button type="button" className="btn btn-primary btn-sm" style={{background: "#008000", border: "#008000"}} onClick={handleSubmit}>Search</button>
            </Row>
        </Container>
    )

}

export default SearchBar;