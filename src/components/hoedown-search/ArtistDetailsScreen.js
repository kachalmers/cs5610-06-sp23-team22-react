import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { findSpotifyArtist } from "./hoedown-service";
import { useSelector } from "react-redux";
function ArtistDetailsScreen() {
    const { spotifyID } = useParams();
    const [artist,setArtist] = useState({});

    const findArtist = async () => {
        if (spotifyID) {
            const spotifyArtist = await findSpotifyArtist(spotifyID);
            if (spotifyArtist.error) {
                setArtist({});
            } else {
                setArtist(spotifyArtist);
            }
        } else {
            setArtist({});
        }
    }

    useEffect(() => {
        findArtist().catch(console.error);
    }, [spotifyID]);

    return(
        <>{spotifyID && artist && artist.name && <>
            Artist details
        </>}</>
    )
}
export default ArtistDetailsScreen;