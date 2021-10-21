import React from "react";
import pp from "./pp.png"

const YorumListesi=(props)=>{
    return (
        <React.Fragment>
            <h3>Yorumlar</h3>
            {props.yorumlar.map((yorum) => {
                return (
                    <div className="ui relaxed list" key={yorum.id}>
                        <div className="item">

                            <img className="ui avatar image" src={pp} />
                            <div className="content">
                                <a className="header">{yorum.display_name}</a>
                                <div className="description">{yorum.body}</div>
                            </div>
                        </div>

                    </div>
                )
            })}
        </React.Fragment>
    )


}

export default YorumListesi;