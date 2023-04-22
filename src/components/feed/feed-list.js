import React, {useEffect, useState} from "react";
import {findLikesOfUserFollowees} from "../../services/likes/likes-service";
import Like from "../like/like"

const FeedList = ({currentUser}) => {
    const [feedItems,setFeedItems] = useState([]);

    const findFeedItems = async () => {
        let items = await findLikesOfUserFollowees(currentUser._id);
        setFeedItems(items);
    }

    useEffect(() => {
        findFeedItems().catch(console.error);
    }, []);

    return(
        <div>
            <div className="fs-3">Welcome, {currentUser.firstName}!</div>
            <ul className="list-group">
                {
                    feedItems.map(item => {
                        return (
                            <Like key={item._id}
                                  item={item}
                            />
                        );
                    })
                }
            </ul>
        </div>
    )
}
export default FeedList;