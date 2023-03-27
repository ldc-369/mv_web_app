import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import UseFetch from '../../../hooks/UseFetch';
import Genres from '../../../components/genres/Genres';
import VoteCircle from '../../../components/voteCircle/VoteCircle';
import Image from "../../../components/image/Image";
import PosterFallback from "../../../assets/no-poster.png";
import Container from '../../../components/container/Container';
import PlayIcon from '../../../components/playIcon/PlayIcon';
import "./style.scss";
import VideoPopup from "../../../components/videoPopup/VideoPopup";



function DetailsBanner(props) {
    const data = props.data;
    const dataCrew = props.dataCrew;
    

    const {type, id} = useParams();
    const {data: dataMovieById, loading: loadingMovieById} = UseFetch(`/${type}/${id}`); 
    const url_slice = useSelector((state)=>state.home_store.url_slice);
    const dataGenresId = dataMovieById?.genres?.map((genreElement)=>genreElement.id); 


    const dataDirector = dataCrew?.filter((f)=>f.job === "Director");
    const dataWriter = dataCrew?.filter((f)=>f.job === "Screenplay" || f.job === "Story" || f.job === "Writer");

    
    const [showPopup, setShowPopup] = useState(false);
    const [videoKey, setVideoKey] = useState(null);


    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };


    return (
        <div className="detailsBanner">
            {!loadingMovieById ? (
                <>
                    {
                        !!dataMovieById &&
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Image src={url_slice.backdrop_firstUrl + dataMovieById.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <Container>
                                <div className="content">
                                    <div className="left">
                                        {
                                            dataMovieById.poster_path?(
                                                <Image className="posterImg" src={url_slice.poster_firstUrl + dataMovieById.poster_path} />
                                            ):(
                                                <Image className="posterImg" src={PosterFallback} />
                                            )
                                        }
                                    </div>

                                    <div className="right">
                                        <div className="title">
                                            {
                                                `${dataMovieById.name || dataMovieById.title} (${dayjs(dataMovieById?.release_date).format('YYYY')})`
                                            }
                                        </div>
                                        <div className="subtitle">
                                            {dataMovieById.tagline}
                                        </div>

                                        <Genres data={dataGenresId} />

                                        <div className="row">
                                            <VoteCircle vote_average={dataMovieById.vote_average.toFixed(1)} />
                                            <div className="playbtn" onClick={()=>{setVideoKey(data?.key), setShowPopup(true)}}>
                                                <PlayIcon />
                                                <span className="text">Watch trailer</span>
                                            </div>
                                        </div>

                                        <div className="overview">
                                            <div className="heading">Overview</div>
                                            <div className="description">
                                                {dataMovieById.overview}
                                            </div>
                                        </div>

                                        <div className="info">
                                            {    
                                                dataMovieById.status && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Status: </span>
                                                        <span className="text">{dataMovieById.status}</span>
                                                    </div>
                                                )
                                            }
                                            {
                                                dataMovieById.release_date && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Release date: </span>
                                                        <span className="text">{dayjs(dataMovieById.release_date).format('DD/MM/YYYY')}</span>
                                                    </div>
                                                )
                                            }
                                            {
                                                dataMovieById.runtime && (
                                                    <div className="infoItem">
                                                        <span className="text bold">Runtime: </span>
                                                        <span className="text">{toHoursAndMinutes(dataMovieById.runtime)}</span>
                                                    </div>
                                                )
                                            }
                                        </div>

                                        {
                                            dataDirector?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">Director: </span>
                                                    <span className="text">
                                                        {dataDirector?.map((d, index)=>(
                                                            <span key={index}>
                                                                {d.name}
                                                                {dataDirector.length - 1 !== index && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )
                                        }

                                        {
                                            dataWriter?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">Writer: </span>
                                                    <span className="text">
                                                        {dataWriter?.map((w, index)=>(
                                                            <span key={index}>
                                                                {w.name}
                                                                {dataWriter.length - 1 !== index && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )
                                        }

                                        {
                                            dataMovieById?.created_by?.length > 0 && (
                                                <div className="info">
                                                    <span className="text bold">Creator: </span>
                                                    <span className="text">
                                                        {dataMovieById?.created_by?.map((c, index)=>(
                                                            <span key={index}>
                                                                {c.name}
                                                                {dataMovieById?.created_by.length - 1 !== index && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                <VideoPopup 
                                    showPopup={showPopup} 
                                    setShowPopup={setShowPopup} 
                                    videoKey={videoKey} 
                                    setVideoKey={setVideoKey} 
                                />
                            
                            </Container>
                        </React.Fragment>
                    }
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <Container>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </Container>
                </div>
            )}
        </div>
    );
}

export default DetailsBanner;