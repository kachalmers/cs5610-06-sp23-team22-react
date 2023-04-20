import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { findSpotifyAlbum } from "./hoedown-service";
import { useSelector } from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
function AlbumDetailsScreen() {
    const { spotifyID } = useParams();
    const [album,setAlbum] = useState({});

    const findAlbum = async () => {
        if (spotifyID) {
            const spotifyAlbum = await findSpotifyAlbum(spotifyID);
            if (spotifyAlbum.error) {
                setAlbum({});
            } else {
                setAlbum(spotifyAlbum);
            }
        } else {
            setAlbum({});
        }
    }

    useEffect(() => {
        findAlbum().catch(console.error);
    }, [spotifyID]);

    const msToTimeDisplay = (ms) => {
        let min = ms/60000;
        let minFloored = Math.floor(min);
        let sec = Math.round((min-minFloored)*60);
        return `${minFloored}:${ sec<10 ? '0'+sec : sec }`;
    }

    return(
        <>{spotifyID && album && album.name && <>
            <div className="list-group">
                <div className="list-group-item">
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            {
                                album.images && album.images[0] ?
                                    <img src={album.images[0].url} alt="Album Cover" className="w-100"/>:
                                    <img className="wd-thumbnail-150px rounded-top" src={"https://static.vecteezy.com/system/resources/previews/004/988/945/original/music-note-with-brown-hat-free-vector.jpg"} alt="Album Cover"/>
                            }
                        </div>
                        <div className="col-8 col-lg-9">
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div className="fs-3 text-truncate col">{album.name}</div>
                                    {/* If album is liked by user, display this... */}
                                    <div className="btn btn-danger rounded-pill d-flex align-items-center">
                                        <FontAwesomeIcon icon="fa-solid fa-heart"/>
                                    </div>
                                    {/* If album is not liked by user, display this... */}
                                    <div className="btn btn-danger rounded-pill d-flex align-items-center">
                                        <FontAwesomeIcon icon="fa-regular fa-heart"/>
                                    </div>
                                </div>

                                <div className="text-truncate">
                                    {album.artists.map(
                                        artist => artist.name
                                    ).join(", ")}
                                </div>
                                <div className="text-secondary text-truncate">{album.release_date}</div>
                                <div className="text-secondary text-truncate">{album.label}</div>
                            </div>
                            <div className="mt-4 fs-6 text-secondary text-truncate">
                                {album.copyrights.map(
                                    (c,i) => <div key={i} className="text-truncate">{c.text}</div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="list-group-item bg-dark text-light">
                    <div className="row">
                        <div className="col-1">#</div>
                        <div className="col">Title</div>
                        {/*<div className="d-none d-xl-block col">Artist</div>*/}
                        <div className="d-none d-md-block col-md-2">Time</div>
                        <div className="col col-lg-4 col-xl-3">Sample</div>
                    </div>
                </div>
                {
                    album.tracks.items.map(track => { return (
                        <div className="list-group-item" key={track.id}>
                            <div className="row align-items-center">
                                <div className="col-1">{track.track_number}</div>
                                <div className="col text-truncate">
                                    <Link to={`/track/${track.id}`} className="text-truncate text-decoration-none fw-bold">{track.name}</Link>
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
                                {/*<div className="d-none d-xl-block col text-truncate">*/}

                                <div className="d-none d-md-block col-md-2">
                                    {msToTimeDisplay(track.duration_ms)}
                                </div>
                                {
                                    track.preview_url !== null ?
                                    <audio className="col col-lg-4 col-xl-3" controls src={track.preview_url}></audio>
                                    : <span className="col col-lg-4 col-xl-3 text-center">-</span>
                                }
                            </div>
                        </div>
                    )})
                }
            </div>
        </>}</>
    )
}
export default AlbumDetailsScreen;