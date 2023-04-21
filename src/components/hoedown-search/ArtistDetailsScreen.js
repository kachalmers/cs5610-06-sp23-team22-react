import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { findSpotifyArtist } from "./hoedown-service";
import { useSelector } from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Review from "./review";
import LikeButton from "./like-button-artist";

function ArtistDetailsScreen() {
    let {currentUser} = useSelector((state) => state.users);
    const { spotifyID } = useParams();
    const [results,setResults] = useState({})

    const findArtist = async () => {
        if (spotifyID) {
            const results = await findSpotifyArtist(spotifyID);
            if (results.error) {
                setResults({})
            } else {
                setResults(results);
            }
        } else {
            setResults({});
        }
    }

    useEffect(() => {
        findArtist().catch(console.error);
    }, [spotifyID]);

    return(
        <>{spotifyID && results.artist && results.artist.name && <>
            <div className="list-group mb-3">
                <div className="list-group-item">
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            {
                                results.artist.images && results.artist.images[0] ?
                                <img src={results.artist.images[0].url} alt="Album Cover" className="w-100"/>:
                                    <img src={"https://static.vecteezy.com/system/resources/previews/004/988/945/original/music-note-with-brown-hat-free-vector.jpg"} alt="Album Cover" className="w-100"/>
                            }
                        </div>
                        <div className="col-8 col-lg-9">
                            <div className="d-flex justify-content-between">
                                <div className="fs-3 fw-bold text-truncate col">{results.artist.name}</div>
                                {
                                    currentUser && currentUser._id &&
                                    <LikeButton currentUser={currentUser._id}
                                                spotifyId={spotifyID}
                                                artist={results.artist}
                                    />
                                }
                            </div>
                            <div>{results.artist.followers.total} Followers</div>
                            {results.artist.genres.map((genre,i) => {
                                const length = results.artist.genres.length;
                                return (
                                    <span className="text-secondary" key={i}>
                                        <>{genre}</>
                                        { i<length-1 && <> &#183; </> }
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {/* Top Tracks */}
            <div className="list-group mb-3">
                <div className="list-group-item bg-dark text-light text-center fs-3">Top Tracks</div>
                <div className="list-group-item bg-light">
                    <div className="table-responsive">
                        <table className="table">
                            <tbody>
                            <tr>
                                {results.tracks &&
                                 results.tracks.map((track) => (
                                     <td key={track.id}>
                                         <Link to={`/track/${track.id}`} className="text-decoration-none">
                                             <div className="bg-white rounded d-flex align-items-center flex-column">
                                                 {
                                                     track.album.images && track.album.images[0] ?
                                                     <img className="wd-thumbnail-150px rounded-top" src={track.album.images[0].url} alt="Album Cover"/>:
                                                     <img className="wd-thumbnail-150px rounded-top" src={"https://static.vecteezy.com/system/resources/previews/004/988/945/original/music-note-with-brown-hat-free-vector.jpg"} alt="Album Cover"/>
                                                 }
                                                 <div className="wd-width-150px text-center px-2">
                                                     <div className="fw-bold text-truncate">{track.name}</div>
                                                     <div className="text-truncate">{track.artists[0].name}</div>
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
                                             <div className="bg-white rounded d-flex align-items-center flex-column">
                                                 {
                                                     album.images && album.images[0] ?
                                                     <img className="wd-thumbnail-150px rounded-top" src={album.images[0].url} alt="Album Cover"/>:
                                                     <img className="wd-thumbnail-150px rounded-top" src={"https://static.vecteezy.com/system/resources/previews/004/988/945/original/music-note-with-brown-hat-free-vector.jpg"} alt="Album Cover"/>
                                                 }
                                                 <div className="wd-width-150px text-center px-2">
                                                     <div className="fw-bold text-truncate">{album.name}</div>
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
            <Review>

            </Review>
        </>}</>
    )
}
export default ArtistDetailsScreen;