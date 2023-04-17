const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const authParams = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET
}

const getToken = async () => {
    const tokenObject = await fetch('https://accounts.spotify.com/api/token',authParams)
        .then(response => response.json())
    return tokenObject.access_token;
}

const getSearchParams = (token) => {
    return {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    }
}

export const searchSpotifySongs = async (search) => {
    let token = await getToken();
    let searchParams = getSearchParams(token);
    let results = await fetch ('https://api.spotify.com/v1/search?q='+search+'&type=track',searchParams)
        .then(response => response.json())
    console.log(results);
    return results.tracks.items;
}

export const findSpotifySong = async (stid) => {
    let token = await getToken();
    let searchParams = getSearchParams(token);
    let results = await fetch('https://api.spotify.com/v1/tracks/'+stid,searchParams)
        .then(response => response.json())
    console.log(results);
    return results;
}

export const findSpotifyAlbum = async (said) => {
    let token = await getToken();
    let searchParams = getSearchParams(token);
    let results = await fetch('https://api.spotify.com/v1/albums/'+said,searchParams)
        .then(response => response.json())
    return results;
}

export const findSpotifyArtist = async (said) => {
    let token = await getToken();
    let searchParams = getSearchParams(token);
    let results = await fetch('https://api.spotify.com/v1/artists/'+said,searchParams)
        .then(response => response.json())
    return results;
}

export const searchSpotify = async (search) => {
    let token = await getToken();
    let searchParams = getSearchParams(token);
    let tracks = await fetch ('https://api.spotify.com/v1/search?q='+search+'&type=track',searchParams)
        .then(response => response.json())
    let albums = await fetch ('https://api.spotify.com/v1/search?q='+search+'&type=album',searchParams)
        .then(response => response.json())
    let artists = await fetch ('https://api.spotify.com/v1/search?q='+search+'&type=artist',searchParams)
        .then(response => response.json())
    const fullReturn = {
        tracks:tracks.tracks.items,
        albums:albums.albums.items,
        artists:artists.artists.items
    }
    console.log(fullReturn);
    return fullReturn;
}