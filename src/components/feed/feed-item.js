import React from "react";
import FeedStats from "./feed-stats";
import { useDispatch } from "react-redux";

const FeedItem = ({item}) => {
    return (
        <div>
            {console.log(item)}
            <div className="list-group-item">
                <b className="me-2">{item.userId.username}</b>
                recommends
                {
                    item.trackId &&
                    <span className="m-0 me-2">{item.trackId.name}</span>
                }
                {
                    item.albumId &&
                    <span className="m-0 me-2">{item.albumId.name}</span>
                }
                {
                    item.artistId &&
                    <span className="m-0 me-2">{item.artistId.name}</span>
                }
                </div>
        </div>
    )
}

export default FeedItem;

