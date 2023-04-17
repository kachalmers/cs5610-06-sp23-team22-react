import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {useNavigate} from "react-router";
import {searchSpotifySongs,findSpotifySong,searchSpotify} from "./hoedown-service";
import "./index.css";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const HoedownSearch = () => {
    const { searchTerm } = useParams();
    const navigate = useNavigate();
    const [search,setSearch] = useState(searchTerm);
    const [results, setResults] = useState({});
    const [albums,setAlbums] = useState([]);
    const [tracks,setTracks] = useState([]);
    const [artists,setArtists] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            searchSpotifyForTracksAlbumsArtists().catch(console.error);
        }
    }, [searchTerm]);

    const searchSpotifyForTracksAlbumsArtists = async () => {
        if (search) {
            const response = await searchSpotify(search);
            setResults(response);
            console.log(response);
            navigate(`/search/${search}`);
        } else {
            setResults({});
        }
    };

    return (
        <>
            <div className="d-flex mb-3 position-relative align-items-center">
                <input placeholder="Search Spotify"
                       className="form-control rounded-pill rounded-end ps-5"
                       value={search}
                       onChange={e => setSearch(e.target.value)}
                />
                <i className="bi bi-search position-absolute ps-3"></i>
                <button className="btn btn-primary rounded-pill rounded-start px-5"
                        onClick={searchSpotifyForTracksAlbumsArtists}
                >
                    <i className="bi bi-search"></i>
                </button>
            </div>

            {/* Tracks */}
            <div className="list-group mb-3">
                <div className="list-group-item bg-dark text-light text-center fs-3">Tracks</div>
                <div className="list-group-item bg-light">
                    <div className="mx-1 row row-cols-2 row-cols-md-3 row-cols-lg-4">
                        {
                            results && results.tracks && results.tracks.map((track) => (
                                <Link to={`/track/${track.id}`} className="card text-decoration-none border-light" key={track.id}>
                                    <img className="card-img-top pt-2 wd-thumbnail-150px" src={track.album.images[0].url} alt="Album Cover"/>
                                    <div className="card-body p-0">
                                        <div className="card-title text-center text-truncate">
                                            <div className="fw-bold">{track.name}</div>
                                            {track.artists[0].name}<br/>
{/*                                            <audio className="w-100" controls src={track.preview_url}>
                                            </audio>*/}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
{/*            <div className="list-group mb-3">
                <div className="list-group-item bg-dark text-light text-center fs-3">Tracks</div>
                <div className="list-group-item d-flex align-items-center fw-bold bg-light">
                    <div className="col-2 col-md-1 me-2">Title</div>
                    <div className="col"></div>
                    <div className="d-none d-md-block col">Album</div>
                </div>
                {
                    results && results.tracks && results.tracks.map((track) => (
                        <Link to={`/track/${track.id}`}
                            className="list-group-item d-flex align-items-center"
                             key={track.id}
                        >
                            <img alt="Album Art" src={track.album.images[0].url}
                                 className="col-2 col-md-1 me-2"
                            />
                            <div className="col">
                                <b>{track.name}</b><br/>
                                {track.artists[0].name}
                            </div>
                            <Link to={`/album/${track.album.id}`} className="d-none d-md-block col">
                                {track.album.name}
                            </Link>
                        </Link>
                    ))
                }
            </div>*/}

            {/* Albums */}
            <div className="list-group mb-3">
                <div className="list-group-item bg-dark text-light text-center fs-3">Albums</div>
                <div className="list-group-item bg-light">
                    <div className="mx-1 row row-cols-2 row-cols-md-3 row-cols-lg-4">
                        {
                            results && results.albums && results.albums.map((album) => (
                                <Link to={`/album/${album.id}`} className="card text-decoration-none border-light" key={album.id}>
                                    <img className="card-img-top pt-2 wd-thumbnail-150px" src={album.images[0].url} alt="Album Cover"/>
                                    <div className="card-body p-0">
                                        <div className="card-title text-center text-truncate">
                                            <div className="fw-bold">{album.name}</div>
                                            {album.artists[0].name}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* Artists */}
            <div className="list-group">
                <div className="list-group-item bg-dark text-light text-center fs-3">Artists</div>
                <div className="list-group-item bg-light">
                    <div className="mx-1 row row-cols-2 row-cols-md-3 row-cols-lg-4">
                        {
                            results && results.artists && results.artists.map((artist) => (
                                <Link to={`/artist/${artist.id}`} className="card text-decoration-none border-light" key={artist.id}>
                                    {
                                        artist.images[0] &&
                                        <img className="card-img-top pt-2 wd-thumbnail-150px" src={artist.images[0].url} alt="Album Cover"/>
                                    }
                                    <div className="card-body p-0">
                                        <div className="card-title text-center fw-bold text-truncate">{artist.name}</div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>

{/*            <h2 className="text-dark">Tracks</h2>
            <div className="mx-2 row row-cols-2 row-cols-md-3 row-cols-lg-4">
                {
                    results && results.tracks && results.tracks.map((track) => {
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

            <h2>Albums</h2>
            <div className="mx-2 row row-cols-2 row-cols-md-3 row-cols-lg-4">
                {
                    results && results.albums && results.albums.map((album) => {
                        return(
                            <Link to={`/album/${album.id}`} className="card text-decoration-none" key={album.id}>
                                <img className="card-img-top pt-2" src={album.images[0].url} alt="Album Cover"/>
                                <div className="card-body">
                                    <div className="card-title text-center fw-bold text-truncate">{album.name}</div>
                                    <div className="text-center text-truncate">{album.artists[0].name}</div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>

            <h2>Artists</h2>
            <div className="mx-2 row row-cols-2 row-cols-md-3 row-cols-lg-4">
                {
                    results && results.artists && results.artists.map((artist) => {
                        return(
                            <Link to={`/album/${artist.id}`} className="card text-decoration-none" key={artist.id}>
                                <img className="card-img-top pt-2" src={artist.images[0].url} alt="Album Cover"/>
                                <div className="card-body">
                                    <div className="card-title text-center fw-bold text-truncate">{artist.name}</div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>*/}
        </>
    );
};

export default HoedownSearch;