import React from "react";
const FindFriendsListItem = (
    {
        who = { userName: 'NASA', handle: 'NASA', avatarIcon: 'nasa.jpg' }
    }
) => {
    return(
        <li className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <div className="me-2">
                        <img className="rounded-circle" height={40} src={who.avatarIcon}/>
                    </div>
                    <div>
                        <div className="fw-bold">{who.userName}</div>
                        <div>@{who.handle}</div>
                    </div>
                </div>
                <div className="float-right">
                    <button className="btn btn-primary rounded-pill">Follow</button>
                </div>
            </div>
        </li>
    );
};
export default FindFriendsListItem;
