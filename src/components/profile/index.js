import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Route, Routes} from "react-router";
import MyToDos from "./my-todos";

const Profile = () => {
    let profile = useSelector((state) => state.profile);
    const displayInterests = (interests) => {
        return (
            <>
                {
                    interests.map(interest =>
                        <span className="pe-2">
                                                <button type="button" className="btn btn-primary btn-sm rounded-pill">{interest}</button>
                        </span>
                    )
                }
            </>
        )

    };
    return(
        <>
            <img alt="banner_picture" className="w-100" src={`/images/${profile.bannerPicture}`}/>
            <div className="d-flex justify-content-between ms-2 me-2 pb-4 mb-2 position-relative">
                <div>
                    <img alt="profile_picture" className="rounded-circle position-absolute fixed-bottom" height={150} width={150}
                         src={`/images/${profile.profilePicture}`}/>
                </div>
                <div>
                    <Link to="/edit-profile"
                          className="mt-2 btn btn-large btn-light border-secondary fw-bold rounded-pill float-end">
                        Edit profile
                    </Link>
                </div>

            </div>
            <h5 className="fw-bold pt-0 pb-0 mb-0">
                {profile.firstName} {profile.lastName}
                <span className="text-secondary"> &#183; {profile.handle}</span>
            </h5>
            <div className="d-flex pt-2 pb-2">
                <div className="wd-text-decoration-none text-secondary pe-3">
                    <i className="bi bi-calendar"></i><span
                    className="ps-1">Joined {profile.dateJoined}</span>
                </div>
                <div className="wd-text-decoration-none text-secondary pe-3">
                    <i className="bi bi-envelope"></i><span
                    className="ps-1">{profile.email}</span>
                </div>
                <div className="wd-text-decoration-none text-secondary pe-3">
                    <i className="bi bi-telephone"></i><span
                    className="ps-1">{profile.phone}</span>
                </div>
            </div>
            <div className="fw-bold">Interests</div>
            <div className="pb-2">
                {displayInterests(profile.interests)}
            </div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link to="/profile/todos" className={`nav-link`}>To-Dos</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/following" className="nav-link">Following ({profile.followingCount})</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/followers" className="nav-link">Followers ({profile.followersCount})</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile/congrats" className="nav-link">My Congrats</Link>
                </li>
            </ul>
            <Routes>
                <Route path="/todos" element={<MyToDos/>}/>
            </Routes>
        </>
    )
}
export default Profile;