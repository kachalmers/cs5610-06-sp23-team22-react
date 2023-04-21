import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {userTogglesFollow} from "../../services/follows/follows-service";
import {Link} from "react-router-dom";

const Review = ({thisReview,currentUser}) => {
    const [review, setReview] = useState(thisReview);

    const displayTime = () => {
        const now = new Date();
        const nowMs = now.getTime();
        const date = new Date(thisReview.date);
        const reviewDateMs = date.getTime();
        const ageMs = nowMs - reviewDateMs;
        const ageSec = ageMs/1000.0;
        const ageMin = ageSec/60.0;
        const ageHr = ageMin/60.0;
        const ageDay = ageHr/24.0;
        let when;
        if(ageDay > 1) {
            when = displayDate(review.date);
        } else if(ageHr > 1) {
            when = Math.round(ageHr) + 'h';
        } else if(ageMin > 1) {
            when = Math.round(ageMin) + 'm';
        } else if(ageSec > 1) {
            when = Math.round(ageSec) + 's';
        } else {
            when = "just now"
        }
        return when;
    }

    const displayDate = (dateFull) => {
        const date = dateFull.substr(0,10);
        return date;
    }

    return(
        <>
            { review &&
                <div className="list-group-item">
                    <div className="d-flex justify-content-between">
                        {
                            review && review.userId &&
                            <Link to={`/profile/${review.userId._id}`}
                                  className="text-decoration-none fw-bold text-truncate">
                                {review.userId.firstName + " " + review.userId.lastName}
                                <span className="text-secondary"> &#183; {"@"
                                                                          + review.userId.username} </span>
                                <FontAwesomeIcon icon="fa-solid fa-certificate"/>
                            </Link>
                        }
                        <div>
                            <div className="text-secondary text-nowrap ms-2">
                                {displayTime()}
                            </div>
                        </div>
                    </div>
                    <div>
                        {review.text}
                    </div>
                </div>
            }
    </>
    )
}
export default Review;