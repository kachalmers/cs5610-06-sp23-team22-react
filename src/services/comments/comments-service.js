import axios from "axios";
const API = process.env.REACT_APP_API_BASE;

const api = axios.create({ withCredentials: true });

export const findReviewsByTrack = async (spotifyId) => {
    const response = await axios.get(
        `${API}/tracks/${spotifyId}/comments`
    );
    console.log(response.data);
    return response.data;
}

export const createTrackReview = async (userId,spotifyId,review) => {
    const response = await axios.post(
        `${API}/users/${userId}/comments/tracks/${spotifyId}`,review
    )
    return response.data;
}