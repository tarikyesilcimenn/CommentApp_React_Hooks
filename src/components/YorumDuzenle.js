import React, {useEffect} from "react";
import { api } from "../api";

const YorumDuzenle = (props) => {

      
    const editComment = (postId, commentId) => {
        api().put(`posts/${postId}/comments/${commentId}`, { body: props.newComment.yorum })
            .then(() => {})
    }

    const onInputChange = (event) => {
        props.setNewComment({ [event.target.name]: event.target.value })
    }
    return (
        <form name="yorum">
            <div className="ui form">

                {props.yorum.id == props.showId ?

                    <div className="field">
                        <textarea name="yorum" defaultValue={props.newComment} rows="2" onChange={onInputChange}></textarea>
                        <button className="ui blue button" type="submit"  onClick={() => editComment(props.yorum.post_id, props.yorum.id)}>Gönder</button>
                    </div>
                    : ""
                }
            </div>

        </form>

    )

}
export default YorumDuzenle;