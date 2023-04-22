import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {userTogglesFollow} from "../../services/follows/follows-service";
import {Link} from "react-router-dom";
import * as commentsService from "../../services/comments/comments-service";
import {useSelector} from "react-redux";

const Review = ({originalReview}) => {
    let {currentUser} = useSelector((state) => state.users);
    const [review,setReview] = useState(originalReview)
    const [reviewText, setReviewText] = useState(review.text);
    const [editing,setEditing]=useState(false);

    const startEditingCommentHandler = (originalComment) => {
        setEditing(true);
        setReviewText(originalComment);
    };

    const updateCommentHandler = async () => {
        let newReview = {};
        newReview.date = review.date;
        newReview.text = reviewText;
        newReview.userId = review.userId._id;
        if (review.trackId) {
            newReview.trackId = review.trackId._id
        }
        if (review.albumId) {
            newReview.albumId = review.albumId._id
        }
        if (review.artistId) {
            newReview.artistId = review.artistId._id
        }
        console.log(newReview);
        await commentsService.updateComment(review._id, newReview);
        setEditing(false);
    }

    const deleteCommentHandler = async () => {
        await commentsService.deleteComment(review._id);
        setReview({deleted:true,text:""});
    }

    const displayTime = () => {
        const now = new Date();
        const nowMs = now.getTime();
        const date = new Date(review.date);
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

    useEffect(() => {
    }, [review]);

    return(
        <>
            { review && !review.deleted &&
                <div className="list-group-item">
                    <div className="d-flex justify-content-between">
                        <div>
                            {
                                review && review.userId &&
                                <Link to={`/profile/${review.userId._id}`}
                                      className="text-decoration-none fw-bold">
                                    {
                                        currentUser && review.userId._id===currentUser._id ?
                                        <span className="me-1">You</span>
                                        : <span className="me-1">{review.userId.firstName + " " + review.userId.lastName}</span>
                                    }
                                    <span className="text-secondary me-1">{" \u00B7 @"+review.userId.username}</span>
                                    {
                                        review.userId.role === "CRITIC" &&
                                        <span className="me-1"><FontAwesomeIcon icon="fa-solid fa-certificate"/></span>
                                    }
                                </Link>
                            }
                        </div>
                        <div>
                            <span>
                                <span className="text-secondary text-nowrap ms-2">
                                    {displayTime()}
                                </span>
                                {
                                    currentUser && review.userId._id===currentUser._id && !editing &&
                                    <span className="ms-2 btn btn-sm btn-secondary"
                                          onClick={() => startEditingCommentHandler(review.text)}
                                    >
                                        <FontAwesomeIcon icon="fa-solid fa-pen-to-square"/>
                                    </span>
                                }
                                {
                                    editing &&
                                    <span className="ms-2 btn btn-sm btn-primary"
                                          onClick={() => updateCommentHandler()}
                                    >
                                        <FontAwesomeIcon icon="fa-solid fa-floppy-disk"/>
                                    </span>
                                }
                                {
                                    currentUser && (review.userId._id===currentUser._id || currentUser.role==="ADMIN") &&
                                    <span className="ms-2 btn btn-sm btn-danger"
                                          onClick={() => deleteCommentHandler()}
                                    >
                                        <FontAwesomeIcon icon="fa-solid fa-trash"/>
                                    </span>
                                }
                            </span>
                        </div>
                    </div>
                    <div>
                        {
                            !editing && reviewText!=='' && <>{reviewText}</>
                        }
                        {
                            editing &&
                            <textarea
                                type="text-area"
                                className="form-control"
                                rows="2"
                                placeholder={`Tell us what you thought!`}
                                value={reviewText}
                                onChange={(e) => {
                                    setReviewText(e.target.value);
                                }}
                            />
                        }
                    </div>
                </div>
            }
            {

            }
    </>
    )
}
export default Review;