import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Card } from "react-bootstrap";
import DisplayContact from "../DisplayContact/DisplayContact";


const FavoriteList = ({ getShelterInfo }) => {
    const [user, token] = useAuth();
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        getFavorites()
    },[])

    const getFavorites = async () => {
        try {
            let response = await axios.get(`http://localhost:8000/api/favorites/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setFavorites(response.data)
        }
        catch (error){
            console.log(error.message)
        }
    }

    const delFavorite = async (id) => {
        let animal_id = parseInt(id)
        try{
            let response = await axios.delete(`http://localhost:8000/api/favorites/${animal_id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            getFavorites()
            console.log(response.status)
        }
        catch(error){
            console.log(error.message)
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
        let id = event.target.value
        getShelterInfo(id)
    }

    return(
        favorites.map((animal, index) => {
            return(
                    <Card style={{ width: '19rem', height: '38rem'}} key={index}>
                        <Card.Img varient="top" src={animal.picture} style={{width:'12rem', height:'12rem', marginLeft:'3.5rem'}} alt={animal.name}/>
                        <Card.Body>
                            <Card.Title style={{overflow:'hidden', 'fontSize':'medium'}}>{animal.name}</Card.Title>
                            <ListGroup>
                                <ListGroupItem>Breed: {animal.breed}</ListGroupItem>
                                <ListGroupItem>Age: {animal.age}</ListGroupItem>
                                <ListGroupItem>Spayed/Neutered: {animal.neutered}</ListGroupItem>
                                <ListGroupItem>House Trained: {animal.house_trained}</ListGroupItem>
                                <ListGroupItem>Good with children: {animal.kids}</ListGroupItem>
                                <ListGroupItem>Good with dogs: {animal.dogs}</ListGroupItem>
                                <ListGroupItem>Good with cats: {animal.cats}</ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                        <Card.Footer>
                            <DisplayContact key={animal.animal_id} contact={animal.contact}/>
                            <button className="btn btn-primary btn-sm" value={animal.animal_id} onClick={() => {delFavorite(animal.id)}} style={{background: "#008000", border:"#008000", marginLeft:"1rem"}}>Delete</button>
                            <button className="btn btn-primary btn-sm" value={animal.shelter}onClick={handleClick} style={{background: "#008000", border:"#008000", marginLeft:"1rem", maxWidth:"5rem"}}>Directions</button>
                        </Card.Footer>
                    </Card>

            )
        })
    )
}
export default FavoriteList;