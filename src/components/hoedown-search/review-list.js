import React, {useEffect, useState} from "react";
import Review from "./review"
import * as commentsService from "../../services/comments/comments-service";
import {useSelector} from "react-redux";

const ReviewList = ({reviewed_thing}) => {
    let {currentUser} = useSelector((state) => state.users);
    const [reviews, setReviews] = useState([]);
    const [review,setReview] = useState('');

    const prepareTrackForService = () => {
        let track = {
            spotifyId: reviewed_thing.id,
            name: reviewed_thing.name,
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
        return track;
    }

    const prepareAlbumForService = () => {
        let album = {
            spotifyId: reviewed_thing.id,
            name: reviewed_thing.name,
        }
        if (reviewed_thing.images[0]) {
            album.imageUrl = reviewed_thing.images[0].url
        }
        let reviewedThingArtists = reviewed_thing.artists;
        let artists = reviewedThingArtists.map((artist) => {
            let spotifyId = artist.id;
            let name = artist.name;
            return {spotifyId,name};
        });
        album.artists = artists;
        return album;
    }

    const prepareArtistForService = () => {
        let artist = {
            spotifyId: reviewed_thing.id,
            name: reviewed_thing.name,
        }
        if (reviewed_thing.images[0]) {
            artist.imageUrl = reviewed_thing.images[0].url
        }
        return artist;
    }

    const prepareReviewForService = () => {
        let reviewToSend = {text:review};
        if (reviewed_thing.type === "track") {
            let track = prepareTrackForService();
            reviewToSend.track=track;
        } else if (reviewed_thing.type === "album") {
            let album = prepareAlbumForService();
            reviewToSend.album=album;
        } else if (reviewed_thing.type === "artist") {
            let artist = prepareArtistForService();
            reviewToSend.artist=artist;
        }
        return reviewToSend;
    }

    const fetchReviews = async () => {
        if (reviewed_thing.type === "track") {
            return commentsService.findReviewsByTrack(reviewed_thing.id).then(reviews => {
                setReviews(reviews)
            })
        } else if (reviewed_thing.type === "album") {
            return commentsService.findReviewsByAlbum(reviewed_thing.id).then(reviews => {
                setReviews(reviews);
            })
        } else if (reviewed_thing.type === "artist") {
            return commentsService.findReviewsByArtist(reviewed_thing.id).then(reviews => {
                setReviews(reviews);
            })
        }
    }

    const createReview = async () => {
        if (review === '') {
            alert("Cannot post empty review!")
        } else {
            let reviewToSend = prepareReviewForService();
            if (reviewed_thing.type === "track") {
                commentsService.createTrackReview(currentUser._id, reviewed_thing.id,reviewToSend).then(fetchReviews);
            } else if (reviewed_thing.type === "album") {
                commentsService.createAlbumReview(currentUser._id, reviewed_thing.id,reviewToSend).then(fetchReviews);
            } else if (reviewed_thing.type === "artist") {
                commentsService.createArtistReview(currentUser._id, reviewed_thing.id,reviewToSend).then(fetchReviews);
            }
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
                                     onClick={createReview}
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
                                    review={review}
                                />
                )
            }
        </div>
    );
}
export default ReviewList;