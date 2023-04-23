import React, {useEffect, useState} from "react";
import User from "../user/user";
import {useDispatch,useSelector} from "react-redux";
import {findAllUsersByTextThunk, findAllUsersThunk} from "../../services/users/users-thunks";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";

const FindFriendsList = () => {
    let {currentUser,users,loading} = useSelector((state) => state.users);
    const { searchTerm } = useParams();
    const navigate = useNavigate();
    const [search,setSearch] = useState(searchTerm);
    const dispatch = useDispatch();

    const fetchUsersByText = async () => {
        if (search) {
            await dispatch(findAllUsersByTextThunk(search));
            navigate(`/find-friends/${search}`);
        } else {
            await fetchUsers();
        }
    };

    const fetchUsers = async () => {
        await dispatch(findAllUsersThunk());
        navigate(`/find-friends`);
    }

    useEffect(() => {
        console.log(searchTerm);
        if (searchTerm) {
            fetchUsersByText()
        } else {
            fetchUsers();
        }
    }, [searchTerm]);

    return (
        <ul className="list-group">
            <li className="list-group-item bg-light">
                <div className="d-flex mb-3 position-relative align-items-center">
                    <input placeholder="Search users"
                           className="form-control rounded-pill rounded-end ps-5"
                           value={search}
                           onChange={e => setSearch(e.target.value)}
                    />
                    <i className="bi bi-search position-absolute ps-3"></i>
                    <button className="btn btn-primary rounded-pill rounded-start px-5"
                            onClick={fetchUsersByText}
                    >
                        <i className="bi bi-search"></i>
                    </button>
                </div>
                <h3>Who to follow</h3>
            </li>
            {
                loading &&
                <li className="list-group-item">
                    Loading users...
                </li>
            }
            {
                users.map(who =>
                                 <User
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