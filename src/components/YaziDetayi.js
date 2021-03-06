import { api } from "../api";
import React, { useEffect, useState } from "react";
import YaziYorumlari from "./YaziYorumlari";
import axios from "axios";
import { Link,useParams,useHistory } from "react-router-dom";
import SilModal from "./silModule";



const YaziDetayi = (props) => {
    const { id } = useParams();
    const history=useHistory();
    console.log(props)
    const [yaziDetayi, setYaziDetayi] = useState({});
    const [yorumlar, setYorumlar] = useState([]);
    
    


    const handleCommentSubmit = (event, yorum) => {
        event.preventDefault();
        api().post(`/posts/${id}/comments`, yorum)
            .then(response => setYorumlar([...yorumlar, response.data]))
            .catch(error => console.log(error));
    }
    useEffect(() => {
        axios.all([
            api().get(`/posts/${id}`),
            api().get(`/posts/${id}/comments`)
        ]).then(responses => {
            setYaziDetayi(responses[0].data);
            setYorumlar(responses[1].data);
        }).catch(error => {
            console.log(error);
        })
    }, [])


    return (
        <React.Fragment>
            <h2 className="ui header">{yaziDetayi.title}</h2>
            <p>{yaziDetayi.created_at}</p>
            <p>{yaziDetayi.content}</p>
            <div className="ui buttons">
                <Link className="ui blue button" to={`/posts/${yaziDetayi.id}/edit`}>Düzenle</Link>
                <SilModal push={history.push} yazi={yaziDetayi}/>
            </div>
            <YaziYorumlari yorumlar={yorumlar} handleSubmit={handleCommentSubmit} />






        </React.Fragment >
    )



}

export default YaziDetayi;