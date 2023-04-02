import React from "react";
import FeedStats from "./feed-stats";
import { useDispatch } from "react-redux";

const FeedItem = ({
                      feed = {
                          "_id": 234,
                          "userName": "Lisa",
                          "image": "",
                          "todo": "Eat breakfast",
                          "feedLiked": true,
                          "likes": 0
                      }
                  }) => {
    const dispatch = useDispatch();

    return (
        <div className="list-group-item p-2">
            <div className="row ms-0 me-0">
                <div className="col-1 p-0">
                    <img src={`../images/${feed.image}`}
                         className="rounded-circle ms-1 mt-1" width="40px" alt="" />
                </div>
                <div className="col-11">
                    <p className="m-0">
                        <b className="m-0 me-2">
                            {feed.userName} <h1>completed</h1> {feed.todo}
                        </b>
                        <FeedStats feed={feed} />
                    </p>


                </div>
            </div>
        </div>
    );
}

export default FeedItem;

