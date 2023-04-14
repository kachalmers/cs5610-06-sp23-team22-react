import React, {useEffect, useState} from "react";
import whoArray from './who.json';
import FindFriendsListItem from "./find-friends-list-item";
import "./index.css";
import {useDispatch,useSelector} from "react-redux";
import {
    findAllUsersThunk
} from "../../services/users/users-thunks";

const FindFriendsList = () => {
    let currentUser = useSelector((state) => state.users.currentUser);
    let usersInitial = useSelector((state) => state.users.users);
    const dispatch = useDispatch();

    const [users, setUsers] = useState(usersInitial);

    const followUser = async () => {
        //await userFollowsUser(currentUser._id, profile._id);
    };

    const fetchUsers = async () => {
        const response = await dispatch(findAllUsersThunk());
        setUsers(response.payload);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <ul className="list-group">
            <li className="list-group-item">
                <div className="col-11 position-relative mb-3">
                    <input placeholder="Search Tuiter"
                           className="form-control rounded-pill ps-5"/>
                    <i className="bi bi-search position-absolute wd-nudge-up"></i>
                </div>
                <h3>Who to follow</h3>
            </li>
            {console.log(currentUser)}
            {
                users.map(who =>
                                 <FindFriendsListItem
                                     key={who._id}
                                     who={who}
                                     currentUser={currentUser}
                                 />
                )
            }
        </ul>
    );
};

export default FindFriendsList;