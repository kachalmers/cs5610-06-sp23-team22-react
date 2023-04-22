import React, {useEffect, useState} from "react";
import ReviewProfile from "../review/review-profile"
import {getCommentsByUserId} from "../../services/comments/comments-service";

const ReviewsProfile = ({pid}) => {
    const [reviews, setReviews] = useState([]);
    const findReviews = () => {
        getCommentsByUserId(pid)
            .then(reviewsList => {
                setReviews(reviewsList);
            })
    }

    useEffect(() => {
        findReviews()
    }, []);

    return (
        <>
            <ul className="list-group">
                {
                    reviews.map(review =>
                                       <ReviewProfile
                                           key={review._id}
                                           originalReview={review}
                                       />
                    )
                }
            </ul>
        </>
    )
}

export default ReviewsProfile;