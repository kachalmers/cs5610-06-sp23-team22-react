import React from "react";
import {useDispatch} from "react-redux";
import {likeToggle} from "../reducers/todos-reducer";

const FeedStats = (
    {
        feed = {
            "_id": 123,
            "time": "2h",
            "congrats": 2345,
            "userName": "Zombie",
            "handle": "@zombie",
            "image": "pearl.png",
            "todo": "Buy cheese for friends",
            "completed": true,
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