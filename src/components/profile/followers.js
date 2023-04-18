import React, {useEffect, useState} from "react";
import {findFollowsByFollowedId} from "../../services/follows/follows-service";
import User from "../user/user";

const Followers = ({pid, currentUser}) => {
    const [followers, setFollowers] = useState([]);
    const findFollowers = () => {
        findFollowsByFollowedId(pid)
            .then(follows => {
                setFollowers(follows);
            })
    }

    useEffect(() => {
        findFollowers()
    }, []);

    return (
        <>
            <ul className="list-group">
                {
                    followers.map(follow =>
                                  <User
                                      key={follow._id}
                                      who={follow.followerId}
                                      currentUser={currentUser}
                                  />
                    )
                }
            </ul>
        </>
    )
}

export default Followers;