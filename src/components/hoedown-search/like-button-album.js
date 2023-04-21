import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import * as likesService from "../../services/likes/likes-service-album";

function LikeButton({currentUser,spotifyId,album}) {
    const [likedByMe,setLikedByMe] = useState(false);

    const fetchLiked = async () => {
        const newLike = await likesService.findAlbumLikeByIds(currentUser,spotifyId)
        if (!newLike.userId) {
            setLikedByMe(false);
        } else {
            setLikedByMe(true);
        }
    }

    const prepareTrackForService = () => {
        let trackToSend = {
            spotifyId: track.id,
            name: track.name,
            imageUrl: track.album.images[0].url
        }
        let artists = track.artists.map((artist) => {
            let spotifyId = artist.id;
            let name = artist.name;
            return {spotifyId,name};
        });
        trackToSend.artists = artists;
        return trackToSend;
    }

    const toggleLike = async () => {
        let trackToSend = prepareTrackForService();
        await likesService.toggleTrackLike(currentUser,spotifyId,trackToSend)
        let newLikedByMe = !likedByMe;
        setLikedByMe(newLikedByMe);
    }

    useEffect(() => {
        fetchLiked().catch(console.error);
    }, []);

    return (
        <>
            {
                currentUser && likedByMe ?
                <div className="btn btn-danger rounded-pill d-flex align-items-center"
                     onClick={toggleLike}
                >
                    <FontAwesomeIcon icon="fa-solid fa-heart"/>
                </div> :
                <div className="btn btn-danger rounded-pill d-flex align-items-center"
                     onClick={toggleLike}
                >
                    <FontAwesomeIcon icon="fa-regular fa-heart"/>
                </div>
            }
        </>
    )
}
export default LikeButton;