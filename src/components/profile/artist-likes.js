import React, {useEffect, useState} from "react";
import {findArtistLikesByUserId} from "../../services/likes/likes-service";
import Like from "../like/like"

const ArtistLikes = ({pid}) => {
    const [artistLikes, setArtistLikes] = useState([]);
    const findLikedArtists = () => {
        findArtistLikesByUserId(pid)
            .then(artistLikes => {
                setArtistLikes(artistLikes);
            })
    }

    useEffect(() => {
        findLikedArtists()
    }, []);

    return (
        <>
            <ul className="list-group">
                {
                    artistLikes.map(artistLike =>
                                      <Like
                                          key={artistLike._id}
                                          item={artistLike}
                                      />
                    )
                }
            </ul>
        </>
    )
}

export default ArtistLikes;