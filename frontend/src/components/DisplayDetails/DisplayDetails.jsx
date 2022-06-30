import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useState, useEffect } from "react";
import CommentList from "../CommentList/CommentList";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Alert from 'react-bootstrap/Alert'
import DisplayContact from "../DisplayContact/DisplayContact";

const DisplayDetails = (animalDetails) => {
    const animal = animalDetails.animalDetails
    const [neuteredStatus, setNeuteredStatus] = useState("")
    const [houseTrained, setHouseTrained] = useState("")
    const [kidFriendly, setKidFriendly] = useState("")
    const [dogFriendly, setDogFriendly] = useState("")
    const [catFriendly, setCatFriendly] = useState("")
    const [contactInfo, setContactInfo] = useState(`Email: ${animal.contact.email} Phone Number: ${animal.contact.phone}`)
    const [user, token] = useAuth();
    const description = animal.description.replace(/&#39;|&amp;#39;|&#039;/g, "'")
    const [show, setShow] = useState(false)

    useEffect(() => {
        neuteredCheck();houseTrainedCheck();kidsCheck();dogsCheck();catsCheck();contactCheck();
      }, [])

    const neuteredCheck = () => {
        if(animal.attributes.spayed_neutered === true){
            setNeuteredStatus("True")
        }
        else if (animal.attributes.spayed_neutered === false){
            setNeuteredStatus("False")
        }
        else{
            setNeuteredStatus("Unknown")
        }
    }
    const houseTrainedCheck = () => {
        if(animal.attributes.house_trained === true){
            setHouseTrained("True")
        }
        else if (animal.attributes.house_trained === false){
            setHouseTrained("False")
        }
        else{
            setHouseTrained("Unknown")
        }
    }
    const kidsCheck = () => {
        if(animal.environment.children === true){
            setKidFriendly("True")
        }
        else if (animal.environment.children === false){
            setKidFriendly("False")
        }
        else{
            setKidFriendly("Unknown")
        }
    }
    const dogsCheck = () => {
        if(animal.environment.dogs === true){
            setDogFriendly("True")
        }
        else if(animal.environment.dogs === false){
            setDogFriendly("False")
        }
        else{
            setDogFriendly("Unknown")
        }
    }
    const catsCheck = () => {
        if(animal.environment.cats === true){
            setCatFriendly("True")
        }
        else if(animal.environment.cats === false){
            setCatFriendly("False")
        }
        else{
            setCatFriendly("Unknown")
        }
    }
    const contactCheck = () => {
        if (animal.contact.email !== null && animal.contact.phone !== null){
            setContactInfo(`Email: ${animal.contact.email} Phone Number: ${animal.contact.phone}`)

        }
        else if(animal.contact.email !== null && animal.contact.phone === null){
            setContactInfo(`Email: ${animal.contact.email}`)
        }
        else if(animal.contact.email === null && animal.contact.phone !== null){
            setContactInfo(`Phone Number: ${animal.contact.phone}`)
        }
        else{
            setContactInfo("No contact information was provided for this animal.")
        }
    }
    const handleAddFav = () => {
        let animalInfo = {
                animal_id: animal.id,
                name: animal.name,
                picture: animal.photos[0].full,
                house_trained: houseTrained, 
                breed: animal.breeds.primary, 
                age: animal.age, 
                neutered: neuteredStatus, 
                kids: kidFriendly, 
                dogs: dogFriendly, 
                cats: catFriendly, 
                contact: contactInfo,
                shelter: animal.organization_id
        }
        const addFav = async () => {
        try{
            await axios.post(`http://localhost:8000/api/favorites/`, animalInfo,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        catch (error){
            console.log(error.message)
        }
        setShow(true)
    }
        addFav()
    }

    return(
        <div className="row">
            <h2>{animal.name}</h2>
            <div className="col-md-4">
            <div className="row" style={{justifyContent:"center"}}>
            <img src={animal.photos[0].full} style={{width:'auto', height:'auto'}} alt={animal.name}></img>
            </div>
            <div className="row" style={{paddingTop:"1rem"}}>
            <div><CommentList animal_id={animal.id}/></div>
            </div>
            </div>
            <div className="col-md-2">
                <div className="row">
                {/* <button onClick={handleClick} className="btn btn-primary btn-sm" style={{width:'10rem',textAlign:'center', alignContent:'right', background:"#008000", border: "#008000"}}>Contact Info</button> */}
                <DisplayContact key={animal.id} contact={contactInfo} />
                { user ? (
                <button onClick={handleAddFav} className="btn btn-primary btn-sm" style={{width:'10rem',textAlign:'center', alignContent:'right', background:"#008000", border: "#008000", marginTop: "1rem"}}>Favorite</button>
                
                ): (
                    <p></p>
                )}
                { show ? (
                    <div className= "d-inline-block" style={{width:'11rem',height:'1rem', marginTop: "1rem", fontSize: '12px', textAlign:'left'}}>
                <Alert variant="dark" style={{wdith: '100%', marginLeft:'-1rem', maxHeight: '3rem', overflow: 'hidden'}} onClose={() => setShow(false)} dismissible>Added to favorites!</Alert> 
                    </div>
                ): (
                <p></p>
                )}
                </div>
            </div>
            <div className="col-md-6">
            <div className="animal-description">{description}</div>
            <ListGroup>
                <ListGroupItem>Spayed/Neutered: {neuteredStatus}</ListGroupItem>
                <ListGroupItem>House Trained: {houseTrained}</ListGroupItem>
                <ListGroupItem>Breed: {animal.breeds.primary}</ListGroupItem>
                <ListGroupItem>Age: {animal.age}</ListGroupItem>
                <ListGroupItem>Good with children: {kidFriendly}</ListGroupItem>
                <ListGroupItem>Good with dogs: {dogFriendly}</ListGroupItem>
                <ListGroupItem>Good with cats: {catFriendly}</ListGroupItem>
            </ListGroup>
            </div>

        
        </div>
    )
}
export default DisplayDetails;