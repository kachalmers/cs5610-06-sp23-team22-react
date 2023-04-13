import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {saveNewProfile} from "../reducers/profile-reducer";
import {useDispatch} from "react-redux";

const EditProfile = () => {
    let profile = useSelector((state) => state.currentUser);
    let [name,setName]=useState(profile.firstName+' '+profile.lastName);
    let [interests,setInterests]=useState(profile.interests.join(","));
    const dispatch = useDispatch();
    const saveHandler = () => {
        const splitName = name.split(' ');
        const splitInterests = interests.split(',');
        const newProfile = {
            ...profile,
            firstName: splitName[0],
            lastName: splitName[1],
            interests: splitInterests
        }
        dispatch(saveNewProfile(newProfile));
    }
    return(
        <>
            <div className="d-flex align-items-center justify-content-between pb-2">
                <div className="d-flex align-items-center">
                    <Link to="/profile">
                        <i className="bi bi-x-lg me-4 text-black"></i>
                    </Link>
                    <h5 className="mb-0">
                        Edit Profile
                    </h5>
                </div>
                <div>
                    <Link to="/profile"
                          className="btn btn-sm fw-bold rounded-pill float-end ps-3 pe-3 bg-black text-white"
                          onClick={saveHandler}
                    >
                        Save
                    </Link>
                </div>
            </div>
            <img alt="banner_picture" className="w-100" src={`/images/${profile.bannerPicture}`}/>
            <div className="d-flex ms-2 me-2 pb-4 mb-2 position-relative">
                <br/><br/>
                <div>
                    <img alt="profile_picture" className="rounded-circle position-absolute fixed-bottom" height={150}
                         src={`/images/${profile.profilePicture}`}/>
                </div>
            </div>
            <div className="mt-2 mb-2 position-relative">
                <label for="name"  className="ps-3 pt-2 position-absolute text-secondary wd-font-13px">
                    Name
                </label>
                <input  id="name"
                        className="form-control pt-4 ps-3"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className="mt-2 mb-2 position-relative">
                <label for="bio" className="ps-3 pt-2 position-absolute text-secondary wd-font-13px">
                    Interests
                </label>
                <textarea   id="bio"
                            className="form-control pt-4 ps-3"
                            rows="3"
                            value={interests}
                            onChange={(event) => setInterests(event.target.value)}
                />
            </div>
        </>
    );
};
export default EditProfile;