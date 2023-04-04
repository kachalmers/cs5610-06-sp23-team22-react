import React from "react";
const FindFriendsListItem = (
    {
        who = { userName: 'NASA', handle: 'NASA', avatarIcon: 'nasa.jpg' }
    }
) => {
    return(
        <li className="list-group-item">
            <div className="row">
                <div className="col-1">
                    <img className="rounded-circle position-absolute" height={40} src={who.avatarIcon}/>
                </div>
                <div className="col-8 position-relative left: 10px">
                    <div className="fw-bold ">{who.userName}</div>
                    <div>@{who.handle}</div>
                </div>
                <div className="col-2">
                    <button className="btn btn-primary rounded-pill float-end">Follow</button>
                </div>
            </div>
        </li>
    );
};
export default FindFriendsListItem;
