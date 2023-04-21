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
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                            <tr>
                                {results.tracks &&
                                 results.tracks.map((track) => (
                                     <td key={track.id}>
                                         <Link to={`/track/${track.id}`} className="text-decoration-none">
                                             <div className="bg-white rounded">
                                                 {
                                                     track.album.images && track.album.images[0] ?
                                                     <img className="wd-thumbnail-150px rounded-top" src={track.album.images[0].url} alt="Album Cover"/>:
                                                         <img className="wd-thumbnail-150px rounded-top" src={"https://static.vecteezy.com/system/resources/previews/004/988/945/original/music-note-with-brown-hat-free-vector.jpg"} alt="Album Cover"/>
                                                 }
                                                 <div className="wd-width-150px text-center px-2">
                                                     <div className="fw-bold text-truncate">{track.name}</div>
                                                     <div className="text-truncate">
                                                         {track.artists.map((artist,i) => {
                                                             const length = track.artists.length;
                                                             return (
                                                                 <span key={i}>
                                                                     <Link to={`/artist/${artist.id}`} className="text-decoration-none">{artist.name}</Link>
                                                                        { i<length-1 && <>, </> }
                                                                 </span>
                                                             )
                                                         })}
                                                     </div>
                                                 </div>
                                             </div>
                                         </Link>
                                     </td>
                                 ))}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Albums */}
            <div className="list-group mb-3">
                <div className="list-group-item bg-dark text-light text-center fs-3">Albums</div>
                <div className="list-group-item bg-light">
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                            <tr>
                                {results && results.albums &&
                                 results.albums.map((album) => (
                                    <td key={album.id}>
                                         <Link to={`/album/${album.id}`} className="text-decoration-none">
                                             <div className="bg-white rounded">
                                                 {
                                                     album.images && album.images[0] ?
                                                     <img className="wd-thumbnail-150px rounded-top" src={album.images[0].url} alt="Album Cover"/>:
                                                     <img className="wd-thumbnail-150px rounded-top" src={"https://static.vecteezy.com/system/resources/previews/004/988/945/original/music-note-with-brown-hat-free-vector.jpg"} alt="Album Cover"/>
                                                 }
                                                 <div className="wd-width-150px text-center px-2">
                                                     <div className="fw-bold text-truncate">{album.name}</div>
                                                     <div className="text-truncate">
                                                         {album.artists.map((artist,i) => {
                                                             const length = album.artists.length;
                                                             return (
                                                                 <span key={i}>
                                                                     <Link to={`/artist/${artist.id}`} className="text-decoration-none">{artist.name}</Link>
                                                                     { i<length-1 && <>, </> }
                                                                 </span>
                                                             )
                                                         })}
                                                     </div>
                                                 </div>
                                             </div>
                                         </Link>
                                     </td>
                                 ))}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Artists */}
            <div className="list-group">
                <div className="list-group-item bg-dark text-light text-center fs-3">Artists</div>
                <div className="list-group-item bg-light">
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                            <tr>
                                {results && results.artists &&
                                 results.artists.map((artist) => (
                                     <td key={artist.id}>
                                         <Link to={`/artist/${artist.id}`} className="text-decoration-none">
                                             <div className="bg-white rounded">
                                                 {
                                                     artist.images && artist.images[0] ?
                                                         <img className="wd-thumbnail-150px rounded-top" src={artist.images[0].url} alt="Album Cover"/>:
                                                         <img className="wd-thumbnail-150px rounded-top" src={"https://static.vecteezy.com/system/resources/previews/004/988/945/original/music-note-with-brown-hat-free-vector.jpg"} alt="Album Cover"/>
                                                 }
                                                 <div className="wd-width-150px text-center px-2">
                                                     <div className="fw-bold text-truncate">{artist.name}</div>
                                                 </div>
                                             </div>
                                         </Link>
                                     </td>
                                 ))}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HoedownSearch;