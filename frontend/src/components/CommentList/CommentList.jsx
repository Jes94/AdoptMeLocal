import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";

const CommentList = (props) => {
    const [comments, setComments] = useState([])
    const [user, token] = useAuth();
    const animal_id = props.animal_id

    const getComments = async (animal_id) => {
        try {
            let response = await axios.get(`http://localhost:8000/api/comments/${animal_id}/`)
            setComments(response.data)
        }
        catch (error){
            console.log(error.message)
        }
    }
    const postComment = async (comment) => {
        try{
            await axios.post(`http://localhost:8000/api/comments/`, 
                {animal_id: props.animal_id, text: comment}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            getComments(props.animal_id);
        }
        catch (error){
            console.log(error.message);
        }
    }

    useEffect(() => {
        getComments(animal_id)
      }, [])

    return(
        <div>
            {user? (<CommentForm postComment={postComment}/>):
            <p>Please Log in to comment.</p>}
            <div></div>
            {comments ? (comments.map((comment)=> {
                return (
                    <Comment key={comment.id} text={comment.text} userName={comment.user.username}/>
                )
            })
            ):(<p>No comments.</p>)}

        </div>
    )


}
export default CommentList;