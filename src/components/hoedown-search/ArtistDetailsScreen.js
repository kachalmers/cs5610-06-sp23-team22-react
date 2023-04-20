import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { findSpotifyArtist } from "./hoedown-service";
import { useSelector } from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
function ArtistDetailsScreen() {
    const { spotifyID } = useParams();
    const [artist,setArtist] = useState({});

    const findArtist = async () => {
        if (spotifyID) {
            const spotifyArtist = await findSpotifyArtist(spotifyID);
            if (spotifyArtist.error) {
                setArtist({});
            } else {
                setArtist(spotifyArtist);
            }
        } else {
            setArtist({});
        }
    }

    useEffect(() => {
        findArtist().catch(console.error);
        console.log(artist)
    }, [spotifyID]);

    return(
        <>{spotifyID && artist && artist.name && <>
            <div className="list-group">
                <div className="list-group-item">
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            {
                                artist.images && artist.images[0] ?
                                <img src={artist.images[0].url} alt="Album Cover" className="w-100"/>:
                                    <img src={"https://static.vecteezy.com/system/resources/previews/004/988/945/original/music-note-with-brown-hat-free-vector.jpg"} alt="Album Cover" className="w-100"/>
                            }
                        </div>
                        <div className="col-8 col-lg-9">
                            <div className="d-flex justify-content-between">
                                <div className="fs-3 text-truncate">{artist.name}</div>
                                {/* If artist is liked by user, display this... */}
                                <div className="btn btn-danger rounded-pill d-flex align-items-center">
                                    <FontAwesomeIcon icon="fa-solid fa-heart"/>
                                </div>
                                {/* If artist is not liked by user, display this... */}
                                <div className="btn btn-danger rounded-pill d-flex align-items-center">
                                    <FontAwesomeIcon icon="fa-regular fa-heart"/>
                                </div>
                            </div>
                            <div>{artist.followers.total} Followers</div>
                            {artist.genres.map((genre,i) => {
                                const length = artist.genres.length;
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
        </>}</>
    )
}
export default ArtistDetailsScreen;