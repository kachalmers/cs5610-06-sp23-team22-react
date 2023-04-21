import {useSelector} from "react-redux";
import FeedItem from "./feed-item";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

const Feed = () => {
    // Instead of this, we'd use a function to only show friends'
    // completed todos (in the form of feed items)
    //let todos = useSelector((state) => state.todos);

    return(
        <div>
            <ul className="list-group">
                This is where likes will go
                {/*                {
                    todos.map(todo => {
                        return (
                            <FeedItem key={todo._id}
                                  todo={todo}/>
                        );
                    })
                }*/}
            </ul>
        </div>
    )
}
export default Feed;