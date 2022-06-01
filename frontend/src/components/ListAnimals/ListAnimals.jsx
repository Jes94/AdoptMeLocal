import React from "react";
import { Card } from "react-bootstrap";

const ListAnimals = ({ animals }) => {

    return(
        animals.map((animal) => {
            if (animal.photos[0] !== undefined) {
                return ( 
                    <Card style={{ width: '18rem', height: '21rem'}} key={animal.id}>
                        <Card.Img varient="top" key={animal.id} src={animal.photos[0].medium} alt={animal.name}/>
                        <Card.Body>
                            <Card.Title style={{overflow:'hidden', 'fontSize':'medium'}}>{animal.name}</Card.Title>
                            <Card.Text style={{overflow:'hidden', 'fontSize':'smaller'}}>{animal.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer>More Info</Card.Footer>
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