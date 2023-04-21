import axios from "axios";
const API = process.env.REACT_APP_API_BASE;

const api = axios.create({ withCredentials: true });

export const findAlbumLikeByIds = async (userId, spotifyId) => {
    if (userId===undefined || spotifyId===undefined) {
        return {};
    } else {
        const response = await axios.get(
            `${API}/users/${userId}/likes/albums/${spotifyId}`
        );
        return response.data;
    }
};

export const toggleAlbumLike = async (userId, spotifyId, album) => {
    const response = await axios.put(
        `${API}/users/${userId}/likes/albums/${spotifyId}`,album
    );
    return response.data;
};

export const findLikesOfUserFollowees = async (userId) => {
    const response = await axios.get(
        `${API}/users/${userId}/followees/likes`
    );
    return response.data;
}

export const updateLike = async (likeId,like) => {
    const response = await axios.put(
        `${API}/likes/${likeId}`,like
    )
    return response.data;
}