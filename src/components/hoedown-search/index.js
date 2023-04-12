import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {searchSpotifySongs,findSpotifySong} from "./hoedown-service";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const HoedownSearch = () => {
    const { searchTerm } = useParams();
    const navigate = useNavigate();
    const [search,setSearch] = useState(searchTerm);
    const [results, setResults] = useState([]);
    //const [token,setToken] = useState("");
    const [albums,setAlbums] = useState([]);
    const [tracks,setTracks] = useState([]);

/*    useEffect(() => {
        console.log("we want token!!!!!!!!!!!!!")
        // API Access Token
        let authParams = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token',authParams)
            .then(response => response.json())
            .then(data => setToken(data.access_token))
    },[]);*/

    useEffect(() => {
        if (searchTerm) {
            searchSpotify().catch(console.error);
        }
    }, [searchTerm]);

    const searchSpotify = async () => {
        if (search) {
            const response = await searchSpotifySongs(search);
            setResults(response);
            navigate(`/search/${search}`);
        }
    };
    findSpotifySong("086myS9r57YsLbJpU0TgK9");
    return (
        <>
            <div className="d-flex mb-2">
                <input placeholder="Search Spotify"
                       className="form-control rounded-pill rounded-end"
                       value={search}
                       onChange={e => setSearch(e.target.value)}
                />
                <button className="btn btn-primary rounded-pill rounded-start px-5"
                        onClick={searchSpotify}>
                    <i className="bi bi-search"></i>
                </button>
            </div>

            <h2>Tracks</h2>
            <div className="mx-2 row row-cols-2 row-cols-md-3 row-cols-lg-4">
                {
                    results.map((track) => {
                        return(
                            <Link to={`/track/${track.id}`} className="card text-decoration-none" key={track.id}>
                                <img className="card-img-top pt-2" src={track.album.images[0].url} alt="Album Cover"/>
                                <div className="card-body">
                                    <div className="card-title text-center fw-bold text-truncate">{track.name}</div>
                                    <div className="text-center text-truncate">{track.artists[0].name}</div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
            <div className="list-group">
                <div className="list-group-item d-flex align-items-center fw-bold">
                    <div className="col-2 col-md-1 me-2">Title</div>
                    <div className="col"></div>
                    <div className="d-none d-md-block col">
                        Album
                    </div>
                </div>
                {
                    results.map((track) => (
                        <div className="list-group-item d-flex align-items-center"
                            key={track.id}
                        >
                            <img alt="Album Art" src={track.album.images[0].url}
                                className="col-2 col-md-1 me-2"
                            />
                            <div className="col">
                                <b>{track.name}</b><br/>
                                {track.artists[0].name}
                            </div>
                            <div className="d-none d-md-block col">
                                {track.album.name}
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default HoedownSearch;