import React, {useEffect, useState} from "react";
import Review from "./review"
import * as commentsService from "../../services/comments/comments-service";
import {useSelector} from "react-redux";

const ReviewList = ({reviewed_thing}) => {
    let {currentUser} = useSelector((state) => state.users);
    const [reviews, setReviews] = useState([]);
    const [review,setReview] = useState('');

    const prepareReviewForService = () => {
        let reviewToSend = {text:review};
        if (reviewed_thing.type === "track") {
            let track = {
                spotifyId: reviewed_thing.id,
                name: reviewed_thing.name,
                imageUrl: reviewed_thing.album.images[0].url
            }
            if (reviewed_thing.album.images[0]) {
                track.imageUrl = reviewed_thing.album.images[0].url
            }
            let reviewedThingArtists = reviewed_thing.artists;
            let artists = reviewedThingArtists.map((artist) => {
                let spotifyId = artist.id;
                let name = artist.name;
                return {spotifyId,name};
            });
            track.artists = artists;
            reviewToSend.track=track;
        }
        return reviewToSend;
    }

    const fetchReviews = async () => {
        return commentsService.findReviewsByTrack(reviewed_thing.id).then(reviews => { setReviews(reviews) })
    }

    const createTrackReview = () => {
        if (review === '') {
            alert("Cannot post empty review!")
        } else {
            let reviewToSend = prepareReviewForService();
            commentsService.createTrackReview(currentUser._id, reviewed_thing.id,reviewToSend).then(fetchReviews);
            setReview("");
        }
    }

    useEffect(() => {
        fetchReviews();
    },[]);

    return (
        <div className="list-group mb-3 mt-3">
            <div className="list-group-item bg-dark text-light text-center fs-3">Reviews</div>
            {   currentUser && currentUser.role==="CRITIC" &&
                <div className="list-group-item">
                    <div className="d-flex">
                        <textarea
                            type="text-area"
                            className="form-control me-2"
                            rows="5"
                            placeholder={`Test us what you thought of ${reviewed_thing.name}!`}
                            value={review}
                            onChange={(e) => {
                                setReview(e.target.value);
                            }}
                        />
                        <div>
                            <button className="btn btn-primary rounded-pill px-3"
                                     onClick={createTrackReview}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            }
            {
                reviews &&
                reviews.map(review =>
                                <Review
                                    key={review._id}
                                    thisReview={review}
                                    //currentUser={currentUser}
                                />
                )
            }
        </div>
    );
}
export default ReviewList;