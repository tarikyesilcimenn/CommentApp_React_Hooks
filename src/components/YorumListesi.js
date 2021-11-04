import React, { useState, useEffect } from "react";
import { api } from "../api";
import pp from "./pp.png"
import YorumDuzenle from "./YorumDuzenle";
const YorumListesi = (props) => {

    const [newComment, setNewComment] = useState({ yorum: "" });
    const [show, setShow] = useState(false);
    const [showId, setShowId] = useState(null);
    const changeVisibility = (data) => {
        props.yorumlar.map((event) => {
            if (event.id === data.id) {
                setShow(!show);
                setShowId(data.id);
                setNewComment(data.body)
            }
            if (showId) {
                setShow(false);
                setShowId(null);
            }
        })
    }
    const refreshToPage=()=>{
        window.location.reload(false);
    }


    const editComment = (postId, commentId) => {
        api().put(`posts/${postId}/comments/${commentId}`, { body: newComment.yorum })
            .then(() => {
                refreshToPage();
                
            })
    }

    const onInputChange = (event) => {
        setNewComment({ [event.target.name]: event.target.value })
    }

    return (
        <>
            <h3>Yorumlar</h3>
            {props.yorumlar.map((yorum) => {
                return (
                    <div className="ui relaxed list" key={yorum.id}>
                        <div className="item">
                            <img className="ui avatar image" src={pp} />
                            <div className="content">
                                <a className="header">{yorum.display_name}</a>
                                <div id="edit" className="description">{yorum.body}</div>
                                <button className="mini ui button" onClick={() => changeVisibility(yorum)}>
                                    Düzenle
                                </button>
                                {/* <YorumDuzenle showId={showId} setNewComment={setNewComment} newComment={newComment} yorum={yorum}/> */}

                                <div className="ui form">

                                    {yorum.id == showId ?

                                        <div className="field">
                                            <textarea name="yorum" defaultValue={newComment} rows="2" onChange={onInputChange}></textarea>
                                            <button className="ui blue button" type="submit" onClick={() => {
                                                editComment(yorum.post_id, yorum.id)
                                            }} >Gönder</button>
                                        </div>
                                        : ""
                                    }
                                </div>




                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
export default YorumListesi;