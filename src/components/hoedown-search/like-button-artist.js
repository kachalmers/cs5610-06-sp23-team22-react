import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import * as likesService from "../../services/likes/artist-likes-service";

function LikeButton({currentUser,spotifyId,artist}) {
    const [likedByMe,setLikedByMe] = useState(false);

    const fetchLiked = async () => {
        const newLike = await likesService.findArtistLikeByIds(currentUser,spotifyId)
        if (!newLike.userId) {
            setLikedByMe(false);
        } else {
            setLikedByMe(true);
        }
    }

    const prepareArtistForService = () => {
        let artistToSend = {
            spotifyId: artist.id,
            name: artist.name,
            imageUrl: artist.images[0].url
        }
        let artists = artist.artists.map((artist) => {
            let spotifyId = artist.id;
            let name = artist.name;
            return {spotifyId,name};
        });
        artistToSend.artists = artists;
        return artistToSend;
    }

    const toggleLike = async () => {
        let artistToSend = prepareArtistForService();
        await likesService.toggleArtistLike(currentUser,spotifyId,artistToSend)
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