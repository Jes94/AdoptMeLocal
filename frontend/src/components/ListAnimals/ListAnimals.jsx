import React from "react";
import { Card } from "react-bootstrap";

const ListAnimals = ({animals, getDetails}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        let intId= parseInt(event.target.id)
        animals.map((animal) => {
            if (animal.id === intId)
            return(
                getDetails({animal}))
            else{
                return(
                <></>)
            }
        })
    };

    return(
        animals.map((animal) => {
            if (animal.photos[0] !== undefined) {
                return ( 
                    <Card style={{ width: '18rem', height: '21rem'}} key={animal.id}>
                        <Card.Img varient="top" src={animal.photos[0].full} style={{width:'9rem', height:'9rem', marginLeft:'4.5rem'}} alt={animal.name}/>
                        <Card.Body>
                            <Card.Title style={{overflow:'hidden', 'fontSize':'medium'}}>{animal.name}</Card.Title>
                            <Card.Text style={{overflow:'hidden', 'fontSize':'smaller'}}>{animal.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer><button className="btn btn-primary btn-sm" key={animal.id} id={animal.id} onClick={handleSubmit}>More Info</button></Card.Footer>
                    </Card>
                )
            }
            else{
                return null;
            }
        })
    )
}

export default ListAnimals;