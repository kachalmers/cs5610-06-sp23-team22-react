import React, {useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as likesService from "../../services/likes/likes-service";
import * as commentsService from "../../services/comments/comments-service";

const FeedItem = ({item,currentUserId}) => {
    const [editing,setEditing]=useState(false);
    const [text,setText] = useState(item.text)

    const startEditingItemHandler = (originalComment) => {
        setEditing(true);
        setText(originalComment);
    };

    const updateItemHandler = async () => {
        let newItem = {};
        newItem.date = item.date;
        newItem.text = text;
        newItem.userId = item.userId._id;
        if (item.trackId) {
            newItem.trackId = item.trackId._id
        }
        if (item.albumId) {
            newItem.albumId = item.albumId._id
        }
        if (item.artistId) {
            newItem.artistId = item.artistId._id
        }
        console.log(newItem);
        await likesService.updateLike(item._id, newItem);
        setEditing(false);
    }

    const displayTime = () => {
        const now = new Date();
        const nowMs = now.getTime();
        const date = new Date(item.date);
        const reviewDateMs = date.getTime();
        const ageMs = nowMs - reviewDateMs;
        const ageSec = ageMs/1000.0;
        const ageMin = ageSec/60.0;
        const ageHr = ageMin/60.0;
        const ageDay = ageHr/24.0;
        let when;
        if(ageDay > 1) {
            when = displayDate(item.date);
        } else if(ageHr > 1) {
            when = Math.round(ageHr) + 'h';
        } else if(ageMin > 1) {
            when = Math.round(ageMin) + 'm';
        } else if(ageSec > 1) {
            when = Math.round(ageSec) + 's';
        } else {
            when = "just now"
        }
        return when;
    }

    const displayDate = (dateFull) => {
        const date = dateFull.substr(0,10);
        return date;
    }

    return (
        <div className="list-group-item">
            <div className="d-flex justify-content-between">
                <div className="">
                    <Link to={`/profile/${item.userId._id}`}
                          className="text-decoration-none fw-bold text-black">
                        {
                            item.userId._id===currentUserId ?
                            <span className="me-1">You</span>
                            : <span className="me-1">{item.userId.firstName + " " + item.userId.lastName}</span>
                        }
                        {
                            item.userId.role === "CRITIC" &&
                            <span className="me-1"><FontAwesomeIcon icon="fa-solid fa-certificate"/></span>
                        }
                    </Link>
                    <span className="me-1">recommended</span>
                    {
                        item.trackId &&
                        <span className="me-1">the song</span>
                    }
                    {
                        item.albumId &&
                        <span className="me-1">the album</span>
                    }
                    {
                        item.artistId &&
                        <span className="me-1">the artist</span>
                    }
                    {
                        item.trackId &&
                        <>
                            <span>
                                <Link className="me-1 text-decoration-none fw-bold"
                                      to={`/track/${item.trackId.spotifyId}`}>{item.trackId.name}</Link>
                            </span>
                            <span className="me-1">by</span>
                            <span>
                                {item.trackId.artists.map((artist,i) => {
                                    const length = item.trackId.artists.length;
                                    return (
                                        <span key={i}>
                                                <Link to={`/artist/${artist.spotifyId}`} className="text-decoration-none">{artist.name}</Link>
                                            { i<length-1 && <>, </> }
                                            </span>
                                    )
                                })}
                            </span>
                        </>
                    }
                    {
                        item.albumId &&
                        <>
                            <span>
                                <Link className="me-1 text-decoration-none fw-bold"
                                      to={`/album/${item.albumId.spotifyId}`}>{item.albumId.name}</Link>
                            </span>
                            <span className="me-1">by</span>
                            <span>
                                {item.albumId.artists.map((artist,i) => {
                                    const length = item.albumId.artists.length;
                                    return (
                                        <span key={i}>
                                                    <Link to={`/artist/${artist.spotifyId}`} className="text-decoration-none">{artist.name}</Link>
                                            { i<length-1 && <>, </> }
                                                </span>
                                    )
                                })}
                            </span>
                        </>
                    }
                    {
                        item.artistId &&
                        <>
                            <span>
                                <Link className="me-2 text-decoration-none fw-bold"
                                      to={`/artist/${item.artistId.spotifyId}`}>{item.artistId.name}</Link>
                            </span>
                        </>
                    }
                </div>
                <div className="text-secondary text-nowrap">
                    <span>
                        {displayTime()}
                    </span>
                    {
                        item.userId._id===currentUserId && !editing &&
                        <span className="ms-2 btn btn-sm btn-secondary"
                              onClick={() => startEditingItemHandler(item.text)}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square"/>
                        </span>
                    }
                    {
                        editing &&
                        <span className="ms-2 btn btn-sm btn-primary"
                              onClick={() => updateItemHandler()}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-floppy-disk"/>
                        </span>
                    }
                </div>
            </div>
            <div className="d-flex mb-2">
                <div className="d-flex mt-2 me-2">
                    <div className="d-flex">
                        {/* Image for track, album, or artist */}
                        <div className="me-2">
                            {
                                item.trackId &&
                                <img height={70} src={item.trackId.imageUrl}/>
                            }
                            {
                                item.albumId &&
                                <img height={70} src={item.albumId.imageUrl}/>
                            }
                            {
                                item.artistId &&
                                <img height={70} src={item.artistId.imageUrl}/>
                            }
                        </div>
                    </div>
                </div>
                <div className="fst-italic mt-2 w-100">
                    {
                        !editing && text!=='' && <>"{text}"</>
                    }
                    {
                        editing &&
                        <textarea
                            type="text-area"
                            className="form-control"
                            rows="2"
                            placeholder={`Tell your friends what you thought!`}
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value);
                            }}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default FeedItem;

