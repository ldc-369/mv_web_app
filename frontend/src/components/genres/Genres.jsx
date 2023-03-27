import React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';

function Genres({data}) {
    const allGenres_attachedId = useSelector((state)=>state.home_store.genres_slice);

    
    return (
        <div className="genres">
            {data.map((id)=>{     
                if(!allGenres_attachedId[id]?.name) {     
                    return;
                }
                return (
                    <div className="genre" key={id}>
                        {allGenres_attachedId[id]?.name}
                    </div>
                );
            })}
        </div>
    );
}

export default Genres;