import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { findSpotifySong } from "./hoedown-service";
import { useSelector } from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
function TrackDetailsScreen() {
    const { spotifyID } = useParams();
    const [song,setSong] = useState({});

    const findSong = async () => {
        if (spotifyID) {
            const spotifySong = await findSpotifySong(spotifyID);
            if (spotifySong.error) {
                setSong({});
            } else {
                setSong(spotifySong);
            }
        } else {
            setSong({});
        }
    }

    useEffect(() => {
        findSong().catch(console.error);
        console.log(song)
    }, [spotifyID]);

    const msToTimeDisplay = (ms) => {
        let min = ms/60000;
        let minFloored = Math.floor(min);
        let sec = Math.round((min-minFloored)*60);
        return `${minFloored}:${ sec<10 ? '0'+sec : sec }`;
    }

    return(
        <>{spotifyID && song && song.name && <>
            <div className="list-group">
                <div className="list-group-item">
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            <img src={song.album.images[0].url} alt="Song Cover" className="w-100"/>
                        </div>
                        <div className="col-8 col-lg-9">
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div className="fs-3 fw-bold text-truncate col">{song.name}</div>
                                    {/* If album is liked by user, display this... */}
                                    <div className="btn btn-danger rounded-pill d-flex align-items-center">
                                        <FontAwesomeIcon icon="fa-solid fa-heart"/>
                                    </div>
                                    {/* If album is not liked by user, display this... */}
                                    <div className="btn btn-danger rounded-pill d-flex align-items-center">
                                        <FontAwesomeIcon icon="fa-regular fa-heart"/>
                                    </div>
                                </div>
                                <div className="fs-4">
                                    {song.artists.map((artist,i) => {
                                        return (
                                            <span key={i}>
                                                    <span className="text-decoration-none">{artist.name}</span>
                                                </span>
                                        )
                                    })}
                                </div>
                                <div>
                                    <div className="fs-6 text-secondary row-cols-5">Track No.{song.track_number}</div>
                                </div>
                                <div className="fs-6 text-secondary row-cols-5">
                                    Time: {msToTimeDisplay(song.duration_ms)}
                                </div>
                                <div className="d-flex justify-content-between">
                                    {song.preview_url !== null ?
                                    <audio className="col" controls src={song.preview_url}></audio>
                                    : <div className="d-flex justify-content-between">
                                            <audio className="col" controls src={song.preview_url}></audio>
                                            <div>
                                                <span className="text-danger align-items-center">Sample Not Available</span>
                                            </div>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>}</>
    )
}
export default TrackDetailsScreen;