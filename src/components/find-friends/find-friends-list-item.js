import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FindFriendsListItem = ({who,currentUser}) => {
    return(
        <li className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <div className="me-2">
                        <img className="rounded-circle" height={40} src="https://media.istockphoto.com/id/532629379/vector/singing-cowboy-with-guitar.jpg?s=612x612&w=0&k=20&c=GY4MyNDgbwZdhHvPhRJ636EK0HW75PU5mLGw--TOYHc="/>
                    </div>
                    <div>
                        <div className="fw-bold">{who.firstName} {who.lastName}</div>
                        <div>@{who.username}</div>
                    </div>
                </div>
                <div className="float-right fw-bold">
                    {
                        currentUser && currentUser._id!==who._id && !who.followedByMe &&
                        <button className="btn btn-primary rounded-pill d-flex align-items-center">
                            <FontAwesomeIcon icon="fa-solid fa-user-plus"/>
                            <span className="d-none d-md-block ms-1">Follow</span>
                        </button>
                    }
                    {
                        currentUser && who.followedByMe &&
                        <button className="btn btn-dark rounded-pill d-flex align-items-center">
                            <FontAwesomeIcon icon="fa-solid fa-user-xmark"/>
                            <span className="d-none d-md-block ms-1">Unfollow</span>
                        </button>
                    }
                </div>
            </div>
        </li>
    );
};
export default FindFriendsListItem;
