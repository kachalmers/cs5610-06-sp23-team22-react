import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { findSpotifySong } from "./hoedown-service";
import { useSelector } from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReviewList from "./review-list"
import User from "../user/user";
import * as likesService from "../../services/likes/likes-service"
import * as commentsService from "../../services/comments/comments-service";
import LikeButton from "./like-button";

function TrackDetailsScreen() {
    let {currentUser} = useSelector((state) => state.users);
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
                            {
                                song.album.images && song.album.images[0] ?
                                    <img src={song.album.images[0].url} alt="Song Cover" className="w-100"/>:
                                    <img className="wd-thumbnail-150px rounded-top" src={"https://static.vecteezy.com/system/resources/previews/004/988/945/original/music-note-with-brown-hat-free-vector.jpg"} alt="Album Cover"/>
                            }
                        </div>
                        <div className="col-8 col-lg-9">
                            <div>
                                <div className="d-flex justify-content-between">
                                    <div className="fs-3 fw-bold text-truncate col">{song.name}</div>
                                    {
                                        currentUser && currentUser._id &&
                                        <LikeButton currentUser={currentUser._id}
                                                    spotifyId={spotifyID}
                                                    track={song}
                                        />
                                    }
                                </div>
                                <div className="text-truncate fs-4">
                                    {song.artists.map((artist,i) => {
                                        const length = song.artists.length;
                                        return (
                                            <span key={i}>
                                                    <Link to={`/artist/${artist.id}`} className="text-decoration-none">{artist.name}</Link>
                                                { i<length-1 && <>, </> }
                                                </span>
                                        )
                                    })}
                                </div>
                                <div className="text-truncate">
                                    <Link to={`/album/${song.album.id}`} className="text-decoration-none">
                                        {song.album.name}
                                    </Link>
                                </div>
                                <div className="fs-6 text-secondary row-cols-5 text-truncate">
                                    Track No. {song.track_number}
                                </div>
                                <div className="fs-6 text-secondary row-cols-5">
                                    Time: {msToTimeDisplay(song.duration_ms)}
                                </div>
                                <div className="mt-2">
                                    {
                                        song.preview_url === null &&
                                        <div>
                                            <span className="text-danger">Sample Not Available</span>
                                        </div>
                                    }
                                    <audio className="w-100" controls src={song.preview_url}></audio>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ReviewList reviewed_thing={song}/>
        </>}</>
    )
}
export default TrackDetailsScreen;