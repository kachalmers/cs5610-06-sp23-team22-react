import React from "react";
import {useDispatch} from "react-redux";
import {likeToggle} from "../../reducers/feed-reducer";

const FeedStats = (
    {
        feed = {
            "userName": "Lisa",
            "image": "",
            "todo": "Eat breakfast",
            "feedLiked": true,
            "likes": 0
        }
    }
) => {
    const dispatch = useDispatch();
    const toggleLikeHandler = (id) => {
        dispatch(likeToggle(id));
    }
    return (
        <div className="d-flex justify-content-between pt-2">
            <span
                className="wd-text-decoration-none text-secondary"
                onClick={()=>toggleLikeHandler(feed._id)}
            >
                <i className={`${feed.feedLiked? "bi bi-heart-fill wd-fg-color-red":"bi bi-heart"}`}></i><span
                className="ps-2">{feed.likes}</span>
            </span>
        </div>
    );
};
export default FeedStats;