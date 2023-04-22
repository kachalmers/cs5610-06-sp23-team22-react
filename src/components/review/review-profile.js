import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import * as commentsService from "../../services/comments/comments-service";
import {useSelector} from "react-redux";

const ReviewProfile = ({originalReview}) => {
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
            {console.log(review)}
            { review && !review.deleted &&
                <div className="list-group-item">
                    <div className="d-flex justify-content-between">
                        <div>
                            <span>
                                {
                                    review && review.userId &&
                                    <span className="fw-bold">
                                        {
                                            currentUser && review.userId._id===currentUser._id ?
                                            <span className="me-1">You</span>
                                            : <span className="me-1">{review.userId.firstName}</span>
                                        }
                                    </span>
                                }
                            </span>
                            <span className="me-1">reviewed</span>
                            {
                                review.trackId &&
                                <span className="me-1">the song</span>
                            }
                            {
                                review.albumId &&
                                <span className="me-1">the album</span>
                            }
                            {
                                review.artistId &&
                                <span className="me-1">the artist</span>
                            }
                            {
                                review.trackId &&
                                <>
                                <span>
                                    <Link className="me-1 text-decoration-none fw-bold"
                                          to={`/track/${review.trackId.spotifyId}`}>{review.trackId.name}</Link>
                                </span>
                                    <span className="me-1">by</span>
                                    <span>
                                    {review.trackId.artists.map((artist,i) => {
                                        const length = review.trackId.artists.length;
                                        return (
                                            <span key={i}>
                                                    <Link to={`/artist/${artist.spotifyId}`} className="text-decoration-none">{artist.name}</Link>
                                                { i<length-1 && <>, </> }
                                                </span>
                                        )
                                    })}
                                </span>
                                </>
                            }
                            {
                                review.albumId &&
                                <>
                                <span>
                                    <Link className="me-1 text-decoration-none fw-bold"
                                          to={`/album/${review.albumId.spotifyId}`}>{review.albumId.name}</Link>
                                </span>
                                    <span className="me-1">by</span>
                                    <span>
                                    {review.albumId.artists.map((artist,i) => {
                                        const length = review.albumId.artists.length;
                                        return (
                                            <span key={i}>
                                                        <Link to={`/artist/${artist.spotifyId}`} className="text-decoration-none">{artist.name}</Link>
                                                { i<length-1 && <>, </> }
                                                    </span>
                                        )
                                    })}
                                </span>
                                </>
                            }
                            {
                                review.artistId &&
                                <>
                                <span>
                                    <Link className="me-2 text-decoration-none fw-bold"
                                          to={`/artist/${review.artistId.spotifyId}`}>{review.artistId.name}</Link>
                                </span>
                                </>
                            }
                        </div>
                        <div className="text-nowrap">
                            <span>
                                <span className="text-secondary text-nowrap ms-2">
                                    {displayTime()}
                                </span>
                                {
                                    currentUser && review.userId._id===currentUser._id && !editing &&
                                    <span className="ms-2 btn btn-sm btn-secondary"
                                          onClick={() => startEditingCommentHandler(reviewText)}
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
                            !editing && reviewText!=='' && <span className="fst-italic">"{reviewText}"</span>
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
    </>
    )
}
export default ReviewProfile;