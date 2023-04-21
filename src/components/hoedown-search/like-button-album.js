import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import * as likesService from "../../services/likes/album-likes-service";

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

    const prepareAlbumForService = () => {
        let albumToSend = {
            spotifyId: album.id,
            name: album.name,
            imageUrl: album.images[0].url
        }
        let artists = album.artists.map((artist) => {
            let spotifyId = artist.id;
            let name = artist.name;
            return {spotifyId,name};
        });
        albumToSend.artists = artists;
        return albumToSend;
    }

    const toggleLike = async () => {
        let albumToSend = prepareAlbumForService();
        await likesService.toggleAlbumLike(currentUser,spotifyId,albumToSend)
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