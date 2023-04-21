import axios from "axios";
const API = process.env.REACT_APP_API_BASE;

const api = axios.create({ withCredentials: true });

export const findReviewsByTrack = async (spotifyId) => {
    const response = await axios.get(
        `${API}/tracks/${spotifyId}/comments`
    );
    return response.data;
}

export const findReviewsByAlbum = async (spotifyId) => {
    const response = await axios.get(
        `${API}/albums/${spotifyId}/comments`
    );
    return response.data;
}

export const findReviewsByArtist = async (spotifyId) => {
    const response = await axios.get(
        `${API}/artists/${spotifyId}/comments`
    );
    return response.data;
}

export const createTrackReview = async (userId,spotifyId,review) => {
    const response = await axios.post(
        `${API}/users/${userId}/comments/tracks/${spotifyId}`,review
    )
    return response.data;
}

export const createAlbumReview = async (userId,spotifyId,review) => {
    const response = await axios.post(
        `${API}/users/${userId}/comments/albums/${spotifyId}`,review
    )
    return response.data;
}

export const createArtistReview = async (userId,spotifyId,review) => {
    const response = await axios.post(
        `${API}/users/${userId}/comments/artists/${spotifyId}`,review
    )
    return response.data;
}

export const updateComment = async (commentId,newComment) => {
    const response = await axios.put(
        `${API}/comments/${commentId}`,newComment
    )
    return response.data;
}