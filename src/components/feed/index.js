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
                :
                <div className="text-center">
                    <h3 className="fw-bold">Please log in to view your feed!</h3>
                    <h4>You may search Spotify and explore users' profiles without logging in.</h4>
                </div>
            }
        </>
    )
}
export default Feed;