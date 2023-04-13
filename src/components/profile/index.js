import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Route, Routes} from "react-router";
import MyToDos from "./my-todos";

const Profile = () => {
    let profile = useSelector((state) => state.currentUser);
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
            <img alt="banner_picture" className="w-100" src="https://media.istockphoto.com/id/465639768/vector/country-dancing-banner.jpg?s=612x612&w=0&k=20&c=Vw9kQsHMRA65Iwz7RQm922Kcqb2RVB9BcQwUAAbb0Z0="/>
            <div className="d-flex justify-content-between ms-2 me-2 pb-4 mb-2 position-relative">
                <div>
                    <img alt="profile_picture" className="rounded-circle position-absolute fixed-bottom" height={150} width={150}
                         src="https://media.istockphoto.com/id/532629379/vector/singing-cowboy-with-guitar.jpg?s=612x612&w=0&k=20&c=GY4MyNDgbwZdhHvPhRJ636EK0HW75PU5mLGw--TOYHc="/>
                </div>
                <div>
                    {
                        profile &&
                        <Link to="/edit-profile"
                              className="mt-2 btn btn-large btn-light border-secondary fw-bold rounded-pill float-end">
                            Edit profile
                        </Link>
                    }
                </div>

            </div>
            {
                profile &&
                <>
                <h5 className="fw-bold pt-0 pb-0 mb-0">
                    {profile.firstName} {profile.lastName}
                    <span className="text-secondary"> &#183; {profile.handle}</span>
                </h5>
                <div className="pt-2">{profile.userType}</div>
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
                <Link to="/profile/liked-music" className={`nav-link`}>Liked Music</Link>
                </li>

            {/* Artist option only */}
                <li className="nav-item">
                <Link to="/profile/playlists" className="nav-link">Playlists</Link>
                </li>

                <li className="nav-item">
                <Link to="/profile/following" className="nav-link"><b>{profile.followingCount}</b> Following</Link>

                </li>
                <li>
                <Link to="/profile/followers" className="nav-link"><b>{profile.followersCount}</b> Followers</Link>
                </li>
                </ul>
                <Routes>
                <Route path="/liked-music" element={<MyToDos/>}/>
                </Routes>
                </>
            }
        </>
    )
}
export default Profile;