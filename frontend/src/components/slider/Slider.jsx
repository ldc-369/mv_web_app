import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Container from '../container/Container';
import Image from '../image/Image';
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss"
import VoteCircle from "../voteCircle/VoteCircle";
import Genres from "../genres/Genres";


function Slider({data, loading, type, title}) {     
    const refContainer = useRef();
    const url_slice = useSelector((state)=>state.home_store.url_slice);
    const navigate = useNavigate();


    const navigation = (direction)=>{
        const container = refContainer.current;
        const scrollAmount = direction === "left"?container.scrollLeft - (container.offsetWidth + 20)
            :container.scrollLeft + (container.offsetWidth + 20);
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        });
    }


    const skLoading = ()=>{
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>   
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    }


    return (
        <div className="carousel">
            <Container>
                {
                    title && <div className="carouselTitle">{title}</div>
                }

                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={()=>navigation("left")} />
                <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={()=>navigation("right")} />
                
                {
                    !loading ? (
                        <div className="carouselItems" ref={refContainer}>
                            {data?.map((resultElement)=>{    
                                const poster = resultElement.poster_path?url_slice.poster_firstUrl + resultElement.poster_path:PosterFallback;
                                return (
                                    <div className="carouselItem" key={resultElement.id} onClick={()=>navigate(`/${resultElement.media_type || type}/${resultElement.id}`)}>
                                        <div className="posterBlock">
                                            <Image src={poster} />
                                            <VoteCircle vote_average={resultElement.vote_average.toFixed(1)} />
                                            <Genres data={resultElement.genre_ids.slice(0, 2)} />   
                                        </div>
                                        <div className="textBlock">
                                            <span className="title">{resultElement.title || resultElement.name}</span>
                                            <span className="date">{dayjs(resultElement.release_date).format('DD/MM/YYYY')}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="loadingSkeleton">
                            {skLoading()}
                            {skLoading()}
                            {skLoading()}
                            {skLoading()}
                            {skLoading()}
                        </div>
                    )
                }
            </Container>
        </div>
    );
}

export default Slider;