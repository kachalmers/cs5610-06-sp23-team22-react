import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {userTogglesFollow} from "../../services/follows/follows-service";
import {Link} from "react-router-dom";

const User = ({who,currentUser}) => {
    const [user, setUser] = useState(who);

    const toggleFollow = async () => {
        await userTogglesFollow(currentUser._id, who._id);
        let newFollowedByMe = !user.followedByMe;
        setUser({ ...user, followedByMe: newFollowedByMe})
    };

    return(
        <li className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <div className="me-2">
                        <img className="rounded-circle" height={40} src="https://media.istockphoto.com/id/532629379/vector/singing-cowboy-with-guitar.jpg?s=612x612&w=0&k=20&c=GY4MyNDgbwZdhHvPhRJ636EK0HW75PU5mLGw--TOYHc="/>
                    </div>
                    <div>
                        <Link to={`/profile/${who._id}`} className="text-decoration-none">
                            <div className="fw-bold">
                                {who.firstName} {who.lastName}
                                {
                                    who.role === "CRITIC" &&
                                    <span className="ms-1"><FontAwesomeIcon icon="fa-solid fa-certificate"/></span>
                                }
                            </div>
                            <div>@{who.username}</div>
                        </Link>
                    </div>
                </div>
                <div className="float-right fw-bold">
                    {
                        currentUser && currentUser._id!==user._id && !user.followedByMe &&
                        <button className="btn btn-primary rounded-pill d-flex align-items-center"
                                onClick={toggleFollow}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-user-plus"/>
                            <span className="d-none d-md-block ms-1">Follow</span>
                        </button>
                    }
                    {
                        currentUser && user.followedByMe &&
                        <button className="btn btn-dark rounded-pill d-flex align-items-center"
                                onClick={toggleFollow}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-user-xmark"/>
                            <span className="d-none d-md-block ms-1">Unfollow</span>
                        </button>
                    }
                </div>
            </div>
        </li>
    );
};
export default User;
