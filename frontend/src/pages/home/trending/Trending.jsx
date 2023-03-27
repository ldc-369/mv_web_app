import React, { useState } from 'react';
import Container from '../../../components/container/Container';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import UseFetch from '../../../hooks/UseFetch';
import Slider from '../../../components/slider/Slider';


function Trending() {
    const [time_window, setTime_window] = useState("day");
    const {data: dataMovies, loading: loadingMovies} = UseFetch(`/trending/all/${time_window}`);


    const onTabChange_button = (props)=>{
        setTime_window(props === "Day"?"day":"week");
    }


    return (
        <div className="carouselSection">    
            <Container>
                <span className="carouselTitle">Trending</span>    
                <SwitchTabs data={["Day", "Week"]} onTabChange_button={onTabChange_button} />
            </Container>
            <Slider data={dataMovies?.results} loading={loadingMovies} />  
        </div>
    );
}

export default Trending;