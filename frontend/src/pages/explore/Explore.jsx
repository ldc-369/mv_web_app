import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import UseFetch from "../../hooks/UseFetch";
import { fetchDataFromAPI } from "../../utils/api";
import Container from "../../components/container/Container";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import './style.scss';



let filters = {};


const dataSortby = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];


function Explore() {
    const [dataMovies, setDataMovies] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortbyItem, setSortbyItem] = useState(null);
    const {type} = useParams();


    const {data: dataGenres} = UseFetch(`/genre/${type}/list`);


    const fetchDataInitial = ()=>{
        setLoading(true);
        fetchDataFromAPI(`/discover/${type}`, filters).then((res)=>{
            setDataMovies(res);
            setPageNum((prev)=>prev + 1);
            setLoading(false);
        });
    }
   

    const fetchDataNextPage = ()=>{     
        fetchDataFromAPI(`/discover/${type}?page=${pageNum}`, filters).then((res)=>{
            if(dataMovies?.results) {
                setDataMovies({
                    ...dataMovies,
                    results: [...dataMovies?.results, ...res.results]
                });
            } else {
                setDataMovies(res);
            }
            setPageNum((prev)=>prev + 1);
        });
    }
   

    useEffect(()=>{    
        filters = {};
        setDataMovies(null);
        setPageNum(1);
        setSortbyItem(null);
        setGenre(null);
        fetchDataInitial();
    }, [type]);


    const onChange = (itemSelected, action)=>{   
        if(action.name === "sortby") {
            setSortbyItem(itemSelected);
            if(action.action !== "clear") {
                filters.sort_by = itemSelected.value;     
            } else {
                delete filters.sort_by;
            }
        }

        if(action.name === "genres") {
            setGenre(itemSelected);
            if(action.action !== "clear") {
                let dataGenreId = itemSelected.map((genreElement)=>genreElement.id);
                dataGenreId = JSON.stringify(dataGenreId).slice(1, -1);
                filters.with_genres = dataGenreId;
            } else {
                delete filters.with_genres;
            }
        }
        setPageNum(1);      
        fetchDataInitial();
    }


    return (
        <div className="explorePage">
            <Container>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {
                            type === "tv"?"Explore TV Shows":"Explore movie"
                        }
                    </div>
                    <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            placeholder="Select genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={dataGenres?.genres}   
                            getOptionLabel={(option)=>option.name}
                            getOptionValue={(option)=>option.id}
                            onChange={onChange}
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />

                        <Select
                            name="sortby"
                            placeholder="Sort by"
                            value={sortbyItem}
                            options={dataSortby}
                            onChange={onChange}
                            isClearable={true}
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>

                {
                    loading && <Spinner initial={true} />
                }
                {
                    !loading && (
                        <>
                            {
                                dataMovies?.results?.length > 0 ? (
                                    <InfiniteScroll
                                        className="content"
                                        dataLength={dataMovies?.results?.length || []}
                                        next={fetchDataNextPage}
                                        hasMore={pageNum <= dataMovies?.total_pages}
                                        loader={<Spinner/>}
                                    >
                                        {dataMovies?.results?.map((resultElement, index)=>{
                                            if(resultElement.media_type === "person") {
                                                return;
                                            }
                                            return (
                                                <MovieCard key={index} data={resultElement} fromSearch={true} type={type} />
                                            )
                                        })}
                                    </InfiniteScroll>
                                ) : (
                                    <span className="resultNotFound">
                                        Sorry, results not found !!!
                                    </span>
                                )
                            }
                        </>
                    )
                }
            </Container>
        </div>
    );
}

export default Explore;

