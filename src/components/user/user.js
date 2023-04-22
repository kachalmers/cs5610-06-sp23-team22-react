import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {userTogglesFollow} from "../../services/follows/follows-service";
import {deleteUser} from "../../services/users/users-service";
import {Link} from "react-router-dom";

const User = ({who,currentUser}) => {
    const [user, setUser] = useState(who);

    const toggleFollow = async () => {
        await userTogglesFollow(currentUser._id, who._id);
        let newFollowedByMe = !user.followedByMe;
        setUser({ ...user, followedByMe: newFollowedByMe})
    };

    const deleteUserHandler = async () => {
        await deleteUser(who._id);
        setUser({ deleted:true})
    }

    return(
        <li className="list-group-item">
            { !user.deleted &&
            <div className="d-flex justify-content-between align-items-center">
                <div>
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
                </div>
                <div className="text-nowrap">
                    <span>
                    {
                        currentUser && currentUser._id!==user._id && !user.followedByMe &&
                        <span className="btn btn-primary rounded-pill">
                            <span className="d-flex align-items-center"
                                    onClick={toggleFollow}
                            >
                                <FontAwesomeIcon icon="fa-solid fa-user-plus"/>
                                <span className="d-none d-md-block ms-1">Follow</span>
                            </span>
                        </span>
                    }
                    {
                        currentUser && user.followedByMe &&
                        <span className="btn btn-dark rounded-pill">
                            <span className="d-flex align-items-center"
                                    onClick={toggleFollow}
                            >
                                <FontAwesomeIcon icon="fa-solid fa-user-xmark"/>
                                <span className="d-none d-md-block ms-1">Unfollow</span>
                            </span>
                        </span>
                    }
                    {
                        currentUser && currentUser._id!==user._id && currentUser.role==="ADMIN" &&
                        <span className="ms-2 btn btn-sm btn-danger"
                              onClick={() => deleteUserHandler()}
                        >
                        <FontAwesomeIcon icon="fa-solid fa-trash"/>
                    </span>
                    }
                    </span>
                </div>
            </div>
            }
        </li>
    );
};
export default User;
