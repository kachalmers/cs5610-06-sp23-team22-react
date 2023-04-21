import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import FeedList from "./feed-list"

const Feed = () => {
    let {currentUser} = useSelector((state) => state.users);

    return(
        <>
            {
                currentUser && currentUser._id ?
                <FeedList currentUser={currentUser}/>
                : <div className="fs-3">Please log in to view your feed!</div>
            }
        </>
    )
}
export default Feed;