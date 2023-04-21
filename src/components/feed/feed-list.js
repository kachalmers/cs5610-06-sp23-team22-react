import {useSelector} from "react-redux";
import FeedItem from "./feed-item";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {findLikesOfUserFollowees} from "../../services/likes/likes-service";

const FeedList = ({currentUser}) => {
    const [feedItems,setFeedItems] = useState([]);

    const findFeedItems = async () => {
        console.log(currentUser);
        let items = await findLikesOfUserFollowees(currentUser);
        setFeedItems(items);
    }

    useEffect(() => {
        findFeedItems().catch(console.error);
        console.log(feedItems)
    }, []);

    return(
        <div>
            <ul className="list-group">
                This is where likes will go
                {
                    feedItems.map(item => {
                        return (
                            <FeedItem key={item._id}
                                      item={item}/>
                        );
                    })
                }
            </ul>
        </div>
    )
}
export default FeedList;