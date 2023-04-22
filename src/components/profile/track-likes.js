import React, {useEffect, useState} from "react";
import {findTrackLikesByUserId} from "../../services/likes/likes-service";
import Like from "../like/like"

const TrackLikes = ({pid}) => {
    const [trackLikes, setTrackLikes] = useState([]);
    const findLikedTracks = () => {
        findTrackLikesByUserId(pid)
            .then(trackLikes => {
                setTrackLikes(trackLikes);
            })
    }

    useEffect(() => {
        findLikedTracks()
    }, []);

    return (
        <>
            <ul className="list-group">
                {
                    trackLikes.map(trackLike =>
                                        <Like
                                            key={trackLike._id}
                                            item={trackLike}
                                        />
                    )
                }
            </ul>
        </>
    )
}

export default TrackLikes;