import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {Route, Routes} from "react-router";
import {
    profileThunk,
    logoutThunk
} from "../../services/users/users-thunks";
import { useNavigate, useParams } from "react-router";
import { findUserById } from "../../services/users/users-service";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FollowersTabLabel from "./followers-tab-label";
import FollowingTabLabel from "./following-tab-label";
import {findFollowsByFollowerId} from "../../services/follows/follows-service";
import Following from "./following";
import Followers from "./followers";
import ArtistLikes from "./artist-likes";
import AlbumLikes from "./album-likes";
import TrackLikes from "./track-likes";
import ReviewsProfile from "./reviews-profile";

const Profile = () => {
    const { userId } = useParams();
    const { currentUser } = useSelector((state) => state.users);
    const [profile, setProfile] = useState(currentUser);
    const [likes, setLikes] = useState([]);
    const [following, setFollowing] = useState([]);
    const [follows, setFollows] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchFollowing = async () => {
        if (profile===null) {
        } else {
            const following = await findFollowsByFollowerId(profile._id);
            setFollowing(following);
        }
    };

    const fetchProfile = async () => {
        if (userId) {
            const user = await findUserById(userId);
            setProfile(user);
            return;
        }
        const response = await dispatch(profileThunk());
        if (response.payload === undefined) {
            navigate("/login");
        }
        setProfile(response.payload);
    };
    const loadScreen = async () => {
        let p = await fetchProfile();
    };

    useEffect(() => {
        loadScreen();
    }, [userId]);

    const getNavPath = () => {
        const urlSegments = window.location.href.split('/');
        return urlSegments[urlSegments.length-1];
    }

    return(<>{profile && <>
        {/* Banner image */}
        <img    alt="banner_picture" className="w-100"
                src="https://media.istockphoto.com/id/465639768/vector/country-dancing-banner.jpg?s=612x612&w=0&k=20&c=Vw9kQsHMRA65Iwz7RQm922Kcqb2RVB9BcQwUAAbb0Z0="
        />
        {/* Profile image, edit profile button, and follow button */}
        <div className="d-flex justify-content-between ms-3 me-2 pb-4 mb-2 position-relative">
            <div>
                <img    alt="profile_picture" className="rounded-circle position-absolute fixed-bottom" height={150} width={150}
                        src="https://media.istockphoto.com/id/532629379/vector/singing-cowboy-with-guitar.jpg?s=612x612&w=0&k=20&c=GY4MyNDgbwZdhHvPhRJ636EK0HW75PU5mLGw--TOYHc="/>
            </div>
            <div>
                {
                    currentUser && profile._id === currentUser._id &&
                    <Link   to="/edit-profile"
                            className="mt-2 btn btn-large btn-light border-secondary fw-bold rounded-pill float-end">
                    Edit profile
                    </Link>
                }
            </div>
        </div>

        {/* Profile info (name, role, etc) */}
        <div className="fs-3 fw-bold pt-0 pb-0 mb-0">
            {profile.firstName+" "+profile.lastName}
            <span className="text-secondary"> &#183; {"@"+profile.username}</span>
        </div>
        <div className="d-flex pt-2 pb-2">
            <div className="wd-text-decoration-none text-secondary pe-3">
                <i className="bi bi-person"></i>
                <span className="ps-1">{profile && profile.role}</span>
            </div>
            {
                currentUser && profile._id === currentUser._id &&
                <div className="wd-text-decoration-none text-secondary pe-3">
                    <i className="bi bi-envelope"></i>
                    <span className="ps-1">{profile.email}</span>
                </div>
            }
        </div>

        {/* Profile navigation tabs */}
        <ul className="nav nav-tabs nav-fill fs-5 text-nowrap">
            {
                profile.role==="CRITIC" &&
                <li className="nav-item bg-light rounded-top me-1" data-toggle="tooltip"
                    title="Reviews">
                    <Link to={`/profile/${profile._id}/reviews`}
                          className={`nav-link d-flex align-items-center justify-content-center ${getNavPath()
                                                                                                  === 'reviews'
                                                                                                  ? 'active'
                                                                                                  : ''}`}>
                        <FontAwesomeIcon icon="fa-solid fa-comment"/><span
                        className="d-none d-xl-block ms-2">Reviews</span>
                    </Link>
                </li>
            }
            <li className="nav-item bg-light rounded-top me-1" data-toggle="tooltip" title="Liked artists">
                <Link to={`/profile/${profile._id}/liked-artists`} className={`nav-link d-flex align-items-center justify-content-center ${getNavPath()==='liked-artists' ?'active':''}`}>
                    <FontAwesomeIcon icon="fa-solid fa-person"/><span className="d-none d-xl-block ms-2">Artists</span>
                </Link>
            </li>
            <li className="nav-item bg-light rounded-top me-1" data-toggle="tooltip" title="Liked albums">
                <Link to={`/profile/${profile._id}/liked-albums`} className={`nav-link d-flex align-items-center justify-content-center ${getNavPath()==='liked-albums' ?'active':''}`}>
                    <FontAwesomeIcon icon="fa-solid fa-record-vinyl"/><span className="d-none d-xl-block ms-2">Albums</span>
                </Link>
            </li>
            <li className="nav-item bg-light rounded-top me-1" data-toggle="tooltip" title="Liked songs">
                <Link to={`/profile/${profile._id}/liked-songs`} className={`nav-link d-flex align-items-center justify-content-center ${getNavPath()==='liked-songs' ?'active':''}`}>
                    <FontAwesomeIcon icon="fa-solid fa-music"/><span className="d-none d-xl-block ms-2">Songs</span>
                </Link>
            </li>
            <li className="nav-item bg-light rounded-top me-1" data-toggle="tooltip" title="Followers">
                <Link to={`/profile/${profile._id}/followers`} className={`nav-link d-flex align-items-center justify-content-center ${getNavPath()==='followers' ?'active':''}`}>
                    <FollowersTabLabel/>
                </Link>
            </li>
            <li className="nav-item bg-light rounded-top" data-toggle="tooltip" title="Following">
                <Link to={`/profile/${profile._id}/following`} className={`nav-link d-flex align-items-center justify-content-center ${getNavPath()==='following' ?'active':''}`}>
                    <FollowingTabLabel/>
                </Link>
            </li>
        </ul>
        <Routes>
            <Route path={`/reviews`} element={<ReviewsProfile pid={profile._id}/>}/>
            <Route path={`/following`} element={<Following pid={profile._id} currentUser={currentUser}/>}/>
            <Route path={`/followers`} element={<Followers pid={profile._id} currentUser={currentUser}/>}/>
            <Route path={`/liked-artists`} element={<ArtistLikes pid={profile._id}/>}/>
            <Route path={`/liked-albums`} element={<AlbumLikes pid={profile._id}/>}/>
            <Route path={`/liked-songs`} element={<TrackLikes pid={profile._id}/>}/>
        </Routes>
    </>}</>)
}
export default Profile;