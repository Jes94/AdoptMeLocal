import DisplayDetails from "../../components/DisplayDetails/DisplayDetails";
const AnimalDetailsPage = (props) => {
    return (
        <div className="container">
        <div><DisplayDetails animalDetails={props.animalDetails}/></div>
        </div>
    )
}

export default AnimalDetailsPage;