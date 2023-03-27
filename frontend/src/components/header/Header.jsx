import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './style.scss';
import {HiOutlineSearch} from 'react-icons/hi';
import {SlMenu} from 'react-icons/sl';
import {VscChromeClose} from 'react-icons/vsc';
import logo from '../../assets/movix-logo.svg';
import Container from '../container/Container';


function Header() {
    const [showTopnav, setShowTopnav] = useState("top");
    const [firstScrollY, setFirstScrollY] = useState(0);       
    const [mobileMenu, setMobileMenu] = useState(false);     
    const [query_tukhoa, setQuery_tukhoa] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


    const openSearchInput = ()=>{
        setSearchInput(true);
        setMobileMenu(false);
    }


    const openMobileMenu = ()=>{
        setMobileMenu(true);
        setSearchInput(false);
    }


    const searchHandle = (event)=>{
        if(event.key === "Enter" && query_tukhoa.length > 0) {
            navigate(`/search/${query_tukhoa}`);
            setTimeout(()=>{
                setSearchInput(false);
            }, 1000);
        }
    }


    const navigationHandle = (type)=>{
        navigate(`/explore_khampha/${type}`);
        setMobileMenu(false);
    }


    const controlTopnav = ()=>{
        if(window.scrollY > 200) {
            if(window.scrollY > firstScrollY && !mobileMenu) {
                setShowTopnav("hide");
            } else {    
                setShowTopnav("show");
            }
        } else {
            setShowTopnav("top");
        }
        setFirstScrollY(window.scrollY);   
    }


    useEffect(()=>{
        window.addEventListener("scroll", controlTopnav);
        return ()=>{
            window.removeEventListener("scroll", controlTopnav);
        }
    }, [firstScrollY]);     


    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [location]);


    return (
        <header className={`header ${mobileMenu?"mobileView":""} ${showTopnav}`}>  
            <Container>
                <div className="logo" onClick={()=>navigate("/")}>
                    <img src={logo} alt="" />
                </div>

                <ul className="menuItems">
                    <li className="menuItem" onClick={()=>navigationHandle("movie")}>Movie</li> 
                    <li className="menuItem" onClick={()=>navigationHandle("tv")}>TV Shows</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearchInput} />
                    </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearchInput} />
                    {
                        mobileMenu?<VscChromeClose onClick={()=>setMobileMenu(false)}/>:<SlMenu onClick={openMobileMenu}/>
                    }
                </div>
            </Container>

            {
                searchInput &&
                <div className="searchBar">
                    <Container>
                        <div className="searchInput">
                            <input type="text" placeholder="Search for a movie or tv show..."
                                onChange={(e) => setQuery_tukhoa(e.target.value)} onKeyUp={searchHandle} />
                            <VscChromeClose onClick={() => setSearchInput(false)} />
                        </div>
                    </Container>
                </div>
            }
        </header>
    );
}

export default Header;