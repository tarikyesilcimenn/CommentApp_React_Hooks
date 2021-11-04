import React, { useState,useEffect } from "react";
import { withRouter } from "react-router";
import { api } from "../api";

const YaziFormu = (props) => {
    console.log(props);
    const [yazi, setYazi] = useState({ title: '', content: '' });
    const [hata, setHata] = useState('');


    const onInputChange = (event) => {
        setYazi({ ...yazi, [event.target.name]: event.target.value })
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
        setHata('');
        if (props.yazi?.title) {
            //edit islemi
            api().put(`/posts/${props.match.params.id}`, yazi)
            .then((response) => {
                props.history.push(`/posts/${props.match.params.id}`)
            }
            ).catch(error=>{
                setHata('Başlık ve yazı içeriği alanları zorunludur.');

            })

        }
    
        else {
    //add islemi
    api().post('/posts', yazi)
        .then(response => {
            props.history.push('/');
        }).catch(error => {
            setHata('Başlık ve yazı içeriği alanları zorunludur.')
        })}
}
useEffect(() => {
    if (props.yazi?.title && props.yazi?.content) 
        setYazi(props.yazi)    
}, [props.yazi])
return (
    <React.Fragment>
        {hata && (
            <div className="ui error message">
                <div className="header">HATA</div>
                <p>{hata}</p>
            </div>
        )}
       <div className="ui form">
            <div className="field">
                <label>Yazı Başlığı</label>
                <input type="text" value={yazi.title} name="title" onChange={onInputChange} />
            </div>
            <div className="field">
                <label>Yazı İçeriği</label>
                <textarea value={yazi.content} rows="3" name="content" onChange={onInputChange}></textarea>
            </div>
            <button onClick={onFormSubmit} className="ui primary button">
                Gönder
            </button>
            <button className="ui button">
                İptal Et
            </button>
        </div>
    </React.Fragment>
)
}

export default withRouter(YaziFormu);