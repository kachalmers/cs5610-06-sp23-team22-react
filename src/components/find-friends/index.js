import React from "react";
import whoArray from './who.json';
import FindFriendsListItem
    from "./find-friends-list-item";
import "./index.css";

const FindFriendsList = () => {
    return (
        <ul className="list-group">
            <li className="list-group-item">
                <div className="col-11 position-relative">
                    <input placeholder="Search Tuiter"
                           className="form-control rounded-pill ps-5"/>
                    <i className="bi bi-search position-absolute wd-nudge-up"></i>
                </div>
                <h3>Who to follow</h3>

            </li>
            {
                whoArray.map(who =>
                                 <FindFriendsListItem
                                     key={who._id}
                                     who={who}/>
                )
            }
        </ul>
    );
};

export default FindFriendsList;