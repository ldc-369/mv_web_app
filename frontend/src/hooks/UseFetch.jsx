import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../utils/api";


function UseFetch(url_last) {            
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(null);
        const [error, setError] = useState(null);

        useEffect(() => {
            setLoading("loading...");
            setData(null);
            setError(null);

            fetchDataFromAPI(url_last)       
                .then((res) => {
                    setLoading(false);
                    setData(res);          
                })
                .catch((err) => {
                    setLoading(false);
                    setError("Something went wrong!!!");
                });
        }, [url_last]);

        return { data, loading, error };    
}

export default UseFetch;
