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
            if (animal.photos[0] !== undefined && animal.description !== null) {
                    const charEncode = /&#39;|&amp;#39;|&#039;/g
                    const description = animal.description.replace(charEncode, "'")
                    const name = animal.name.replace(charEncode, "'")
                    return (
                        <Card style={{ width: '18rem', height: '21rem'}} key={animal.id}>
                        <Card.Img varient="top" src={animal.photos[0].full} style={{width:'9rem', height:'9rem', marginLeft:'4.5rem'}} alt={animal.name}/>
                        <Card.Body>
                            <Card.Title style={{overflow:'hidden', 'fontSize':'medium'}}>{name}</Card.Title>
                            <Card.Text style={{overflow:'hidden', 'fontSize':'smaller'}}>{description}</Card.Text>
                        </Card.Body>
                        <Card.Footer><button className="btn btn-primary btn-sm" key={animal.id} id={animal.id} onClick={handleSubmit} style={{background: "#008000", border:"#008000"}}>More Info</button></Card.Footer>
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