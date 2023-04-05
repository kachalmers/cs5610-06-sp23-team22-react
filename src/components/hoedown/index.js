import React from "react";

const Hoedown = () => {
    return (
        <ul className="list-group">
            <li className="list-group-item">
                <div className="col-11 position-relative">
                    <input placeholder="Search Spotify"
                           className="form-control rounded-pill ps-5"/>
                    <i className="bi bi-search position-absolute wd-nudge-up"></i>
                </div>
            </li>
        </ul>
    );
};

export default Hoedown;