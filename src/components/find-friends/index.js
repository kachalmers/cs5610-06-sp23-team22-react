import React, {useEffect} from "react";
import FindFriendsListItem from "./find-friends-list-item";
import {useDispatch,useSelector} from "react-redux";
import {findAllUsersThunk} from "../../services/users/users-thunks";

const FindFriendsList = () => {
    let {currentUser,users,loading} = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const fetchUsers = async () => {
        await dispatch(findAllUsersThunk());
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <ul className="list-group">
            <li className="list-group-item">
                <div className="d-flex mb-3 position-relative align-items-center">
                    <input placeholder="Search users"
                           className="form-control rounded-pill rounded-end ps-5"
                           //value={search}
                           //onChange={e => setSearch(e.target.value)}
                    />
                    <i className="bi bi-search position-absolute ps-3"></i>
                    <button className="btn btn-primary rounded-pill rounded-start px-5"
                            //onClick={searchSpotifyForTracksAlbumsArtists}
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