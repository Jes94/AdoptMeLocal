import { useState } from "react"
import "./SearchBar.css";
import { Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
    const [animalType, setAnimalType] = useState("dog");
    const [zipCode, setZipCode] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        props.searchParams({zipCode: zipCode, animalType: animalType})
        navigate("/results")
    };


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
                <Col sm={1}>
                    <button type="button" className="btn btn-primary btn-sm" onClick={handleSubmit}>Search</button>
                </Col>
            </Row>
        </Container>
    )

}

export default SearchBar;