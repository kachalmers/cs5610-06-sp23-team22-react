import React, {useEffect, useState} from "react";
import {findAlbumLikesByUserId} from "../../services/likes/likes-service";
import Like from "../like/like"

const AlbumLikes = ({pid}) => {
    const [albumLikes, setAlbumLikes] = useState([]);
    const findAlbumLikes = () => {
        findAlbumLikesByUserId(pid)
            .then(albumLikes => {
                setAlbumLikes(albumLikes);
            })
    }

    useEffect(() => {
        findAlbumLikes()
    }, []);

    return (
        <>
            <ul className="list-group">
                {
                    albumLikes.map(albumLike =>
                                        <Like
                                            key={albumLike._id}
                                            item={albumLike}
                                        />
                    )
                }
            </ul>
        </>
    )
}

export default AlbumLikes;