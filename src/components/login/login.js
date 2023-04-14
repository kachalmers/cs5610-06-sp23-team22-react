import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginThunk } from "../../services/users/users-thunks";

function Login() {
    const { currentUser } = useSelector((state) => state.users);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = async () => {
        try {
            const response = await dispatch(loginThunk({ username, password }));
            if (response.payload === undefined) {
                throw new Error("Couldn't find user with matching username and password!")
            } else {
                navigate("/profile");
            }
        } catch (err) {
            alert(err);
        }
    };
    return (
        <>
            <h3>Log In</h3>

            <div className="form-group mb-3">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    className="form-control"
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
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>

            <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary rounded-pill fw-bold"
                        onClick={login}>
                    Submit
                </button>
            </div>

            <div>
                <i className="bi-text-indent-right me-1"></i>
                Register <a href={"/sign-up"}>New Account</a>
            </div>
        </>
    )
}
export default Login;