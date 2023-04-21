import {useSelector} from "react-redux";
import FeedItem from "./feed-item";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {findLikesOfUserFollowees} from "../../services/likes/likes-service";
import FeedList from "./feed-list"

const Feed = () => {
    let {currentUser} = useSelector((state) => state.users);

    return(
        <>
            {
                currentUser && currentUser._id &&
                <FeedList currentUser={currentUser._id}/>
            }
        </>
    )
}
export default Feed;