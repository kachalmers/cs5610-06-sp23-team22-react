export const searchSpotifySongs = async (token,search) => {
    console.log("Searching (2) for "+search);
    let searchParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    }
    let results = await fetch ('https://api.spotify.com/v1/search?q='+search+'&type=track',searchParams)
        .then(response => response.json())
    console.log(results.tracks.items);
    return results.tracks.items;
}
