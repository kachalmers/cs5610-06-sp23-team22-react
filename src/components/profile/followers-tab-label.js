import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

function FollowersTabLabel() {
    return (
        <>
            <div className="d-flex justify-content-center mx-3">
                <div className="d-flex justify-content-center">
                    <div className="d-flex align-self-end">
                        <FontAwesomeIcon icon="fa-solid fa-user" className="fs-5"/>
                    </div>
                    <div className="d-flex position-absolute">
                        <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6 me-3"/>
                        <FontAwesomeIcon icon="fa-regular fa-user" className="fs-6"/>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <span className="d-none d-xl-block ms-2">Followers</span>
            </div>
        </>
    )
}
export default FollowersTabLabel;