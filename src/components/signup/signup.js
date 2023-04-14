import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { registerThunk } from "../../services/users/users-thunks";

function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role,setRole] = useState("USER");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const register = () => {
        try {
            dispatch(registerThunk(
                { firstName, lastName, email, username, password, role})
            );
            navigate("/profile");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <form>
            <h3>Sign Up</h3>

            <div className="form-group mb-3">
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    className="form-control"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    className="form-control"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>

            <div className="mb-3">
                Role
                <div className="form-check"
                     onClick={(e) => {setRole("ARTIST")}}
                >
                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                           id="artist"/>
                    <label className="form-check-label" htmlFor="artist">
                        Artist
                    </label>
                </div>
                <div className="form-check"
                     onClick={(e) => {setRole("USER")}}
                >
                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                           id="user"/>
                    <label className="form-check-label" htmlFor="user">
                        User
                    </label>
                </div>
            </div>

            <div className="mb-3">
                <button onClick={register} className="btn btn-primary rounded-pill fw-bold w-100">
                    Sign Up
                </button>
            </div>

            <p className="forgot-password text-right">
                Already registered? <a href="/login">Sign in</a>
            </p>
        </form>
    )
}
export default SignUp;