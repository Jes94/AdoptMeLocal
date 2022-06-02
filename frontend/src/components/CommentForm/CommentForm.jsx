import { useState } from "react";

    const CommentForm = (props) => {

        const [comment, setComment] = useState("")

        const handleSubmit = (event) => {
            event.preventDefault();
            props.postComment(comment);
            setComment("");
        }

        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="commentInput">Enter Comment: </label>
                <input type="text" id="commentInput" value={comment} onChange={(event) => setComment(event.target.value)}/>
            </form>
        )
}
export default CommentForm;