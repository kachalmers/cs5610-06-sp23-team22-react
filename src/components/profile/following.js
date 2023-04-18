import React, {useEffect, useState} from "react";
import {findFollowsByFollowerId} from "../../services/follows/follows-service";
import User from "../user/user";

const Following = ({pid, currentUser}) => {
    const [following, setFollowing] = useState([]);
    const findFollowing = () => {
        findFollowsByFollowerId(pid)
            .then(follows => {
                setFollowing(follows);
            })
    }

    useEffect(() => {
        findFollowing()
    }, []);

    return (
        <>
            <ul className="list-group">
                {
                    following.map(follow =>
                                  <User
                                      key={follow._id}
                                      who={follow.followeeId}
                                      currentUser={currentUser}
                                  />
                    )
                }
            </ul>
        </>
    )
}

export default Following