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