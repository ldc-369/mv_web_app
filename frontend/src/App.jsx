import { useEffect, useState } from 'react'
import { fetchDataFromAPI } from './utils/api'
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResults from './pages/searchResults/SearchResults';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';



function App() {
    const dispatch = useDispatch();     
    const url_slice = useSelector((state)=>state.home_store.url_slice);


    useEffect(()=>{
      fetchAPIConfig();
      genresCall();
    }, []);


    const fetchAPIConfig = ()=>{    
      fetchDataFromAPI('/configuration').then((res)=>{
        console.log(res);
        const baseURL_and_Size = {
          backdrop_firstUrl: res.images.secure_base_url + 'original',
          poster_firstUrl: res.images.secure_base_url + 'original',
          profile_firstUrl: res.images.secure_base_url + 'original',
        }
        dispatch(getApiConfiguration(baseURL_and_Size));     
      });
    }


    const genresCall = async()=>{    
      let promises = [];
      let typeArr = ["tv", "movie"];
      let allGenres_attachedId = {};     

      typeArr.forEach((type)=>{
        promises.push(fetchDataFromAPI(`/genre/${type}/list`))
      });
      const dataGenres = await Promise.all(promises);
      console.log(dataGenres);

      dataGenres.map(({genres})=>{  
        return genres.map((genreElement)=>(allGenres_attachedId[genreElement.id] = genreElement));
      });
      dispatch(getGenres(allGenres_attachedId));   
    }


    return (
      <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path='/' element={<Home />} />    
            <Route exact path='/:type/:id' element={<Details />} />
            <Route exact path='/search/:query_tukhoa' element={<SearchResults />} />
            <Route exact path='/explore_khampha/:type' element={<Explore />} />
            <Route exact path='*' element={<PageNotFound />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    )
}

export default App
