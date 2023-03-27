import React from 'react';
import { useParams } from 'react-router-dom';
import UseFetch from '../../hooks/UseFetch';
import Cast from './cast/Cast';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Recommendation from './slider/Recommendation';
import Similar from './slider/Similar';
import './style.scss';
import VideosSection from './videosSection/VideosSection';

function Details() {
    const {type, id} = useParams();

    
    const {data: dataVideosByMovieId, loading: loadingVideosByMovieId} = UseFetch(`/${type}/${id}/videos`);    ///lấy video cho phim theo id phim

    
    const {data: dataCreditsByMovieId, loading: loadingCreditsByMovieId} = UseFetch(`/${type}/${id}/credits`);    

    
    return (
        <div>
            <DetailsBanner data={dataVideosByMovieId?.results?.[0]} dataCrew={dataCreditsByMovieId?.crew} />
            <Cast data={dataCreditsByMovieId?.cast} loading={loadingCreditsByMovieId} />
            <VideosSection data={dataVideosByMovieId} loading={loadingVideosByMovieId} />
            <Similar type={type} id={id} />
            <Recommendation type={type} id={id} />
        </div>
    );
}

export default Details;