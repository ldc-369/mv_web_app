import React, { useState } from 'react';
import Container from '../../../components/container/Container';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import UseFetch from '../../../hooks/UseFetch';
import Slider from '../../../components/slider/Slider';


function TopRated() {
    const [type, setType] = useState("movie");
    const {data: dataMovies, loading: loadingMovies} = UseFetch(`/${type}/top_rated`);


    const onTabChange_button = (props)=>{
        setType(props === "Movies"?"movie":"tv");
    }


    return (
        <div className="carouselSection">   
            <Container>
                <span className="carouselTitle">Top rated</span>  
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange_button={onTabChange_button} />
            </Container>
            <Slider data={dataMovies?.results} loading={loadingMovies} type={type} /> 
        </div>
    );
}

export default TopRated;