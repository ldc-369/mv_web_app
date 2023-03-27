import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UseFetch from '../../../hooks/UseFetch';
import './style.scss';
import Image from '../../../components/image/Image';
import Container from '../../../components/container/Container';



function HeroBanner() {
    const [backdrop, setBackdrop] = useState("");
    const [query_tukhoa, setQuery_tukhoa] = useState("");   
    const navigate = useNavigate();     
    const {data: dataMovies, loading: loadingMovies} = UseFetch('/movie/upcoming');    
    const url_slice = useSelector((state)=>state.home_store.url_slice);


    useEffect(()=>{     
        const backdrop_path = dataMovies?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        const backdrop_fullUrl = url_slice.backdrop_firstUrl + backdrop_path;
        setBackdrop(backdrop_fullUrl);
    }, [dataMovies]);


    const searchHandle = (event)=>{
        if((event.key === "Enter") && query_tukhoa.length > 0) {
            navigate(`/search/${query_tukhoa}`);
        }
    }


    return (
        <div className="heroBanner">

            {
                !loadingMovies &&
                <div className="backdrop-img">
                    <Image src={backdrop} />
                </div>
            }

            <div className="opacity-layer"></div>

            <Container>
                <div className="heroBannerContent">
                    <span className="title">Welcome</span>
                    <span className="subTitle">
                        Millions of movie, TV shows and people
                        to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input type="text" placeholder="Search for a movie or tv show..."
                            onChange={(e)=>setQuery_tukhoa(e.target.value)} onKeyUp={searchHandle} />
                        <button>Search</button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default HeroBanner;