import useAuth from "../../hooks/useAuth";
import axios from "axios";

const AddFavorite = async(props) => {
    const [user, token] = useAuth();
    try{
        await axios.post(`http://localhost:8000/api/favorites/`, props.animalInfo,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    catch (error){
        console.log(error.message)
    }
}
export default AddFavorite;