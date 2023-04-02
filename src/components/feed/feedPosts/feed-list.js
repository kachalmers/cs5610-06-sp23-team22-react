import React from "react";
import {useSelector} from "react-redux";
import FeedItem from "./feed-item";
import feed from "../index";

const FeedList = () => {
    const feedArray = useSelector(state => state.feedArray)
    return(
        <ul className="list-group">
            {
                feedArray.map(post =>
                    <FeedItem
                        key={post._id} post={post}/> )
            }
        </ul>
    );
};
export default FeedList;