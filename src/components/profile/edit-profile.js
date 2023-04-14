import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateUserThunk} from "../../services/users/users-thunks";

const EditProfile = () => {
    const { currentUser } = useSelector((state) => state.users);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();

    const updateProfile = async () => {
        await dispatch(updateUserThunk(profile));
    };

    return(<>{profile && <>
        <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
                <Link to="/profile"
                      data-toggle="tooltip" data-placement="bottom"
                      title="Cancel changes">
                    <i className="bi bi-arrow-left-square-fill me-4 text-black fs-2"></i>
                </Link>
                <h3 className="mb-0">
                    Edit Profile
                </h3>
            </div>
            <div>
                <Link to="/edit-profile"
                      className="btn btn-large fw-bold rounded-pill float-end ps-3 pe-3 bg-black text-white"
                      onClick={updateProfile}
                >
                    Save
                </Link>
            </div>
        </div>
        <div className="mb-3">
            <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                type="text"
                className="form-control"
                placeholder="Enter your first name"
                value={profile.firstName}
                onChange={(e) => {
                    setProfile({ ...profile, firstName: e.target.value });
                }}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
                type="text"
                className="form-control"
                placeholder="Enter your last name"
                value={profile.lastName}
                onChange={(e) => {
                    setProfile({ ...profile, lastName: e.target.value });
                }}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={profile.email}
                onChange={(e) => {
                    setProfile({ ...profile, email: e.target.value });
                }}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                readOnly={true}
                className="form-control"
                value={profile.username}
                onChange={(e) => {
                    setProfile({ ...profile, username: e.target.value });
                }}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={profile.password}
                onChange={(e) => {
                    setProfile({ ...profile, password: e.target.value });
                }}
            />
        </div>
        <div>
            Role
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault"
                       id="admin" checked={profile.role==="ADMIN"} disabled/>
                <label className="form-check-label" htmlFor="admin">
                    Administrator
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault"
                       id="artist" checked={profile.role==="ARTIST"} disabled/>
                <label className="form-check-label" htmlFor="artist">
                    Artist
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault"
                       id="user" checked={profile.role==="USER"} disabled/>
                <label className="form-check-label" htmlFor="user">
                    User
                </label>
            </div>
        </div>
    </>}</>);
};
export default EditProfile;