import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const NavigationSidebar = () => {
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const active = paths[1];
    const screenChoices = [
        {
            label: 'GidiUp',
            link: '/gidiup',
            activePaths: [],
            iconClassName: "fa-solid fa-hat-cowboy"
        },
        {
            label: 'Login',
            link: '/login',
            activePaths: ['login'],
            iconClassName: "fa-solid fa-door-open"
        },
        {
            label: 'Profile',
            link: '/profile',
            activePaths: ['profile','edit-profile'],
            iconClassName: "fa-regular fa-user"
        },
        {
            label: 'To-do',
            link: '/todos',
            activePaths: ['todos','gidiup','',undefined],
            iconClassName: "fa-solid fa-list"
        },
        {
            label: 'Feed',
            link: '/feed',
            activePaths: ['feed'],
            iconClassName: "fa-regular fa-newspaper"
        },
        {
            label: 'Find friends',
            link: '/find-friends',
            activePaths: ['find-friends'],
            iconClassName: "fa-solid fa-user-plus"
        }
    ]
    return (
        <div className="list-group">
            {
                screenChoices.map((screenChoice,index) =>
                    <Link   to={screenChoice.link}
                            className={`list-group-item ${screenChoice.activePaths.includes(active)?'active':''}`}
                            key={index}
                    >
                        <div className="row align-items-center">
                            {
                                screenChoice.iconClassName !== '' &&
                                <div className="d-flex col col-lg-3 justify-content-center">
                                    <FontAwesomeIcon icon={screenChoice.iconClassName}/>
                                </div>
                            }
                            <div className="d-none d-lg-block col">{screenChoice.label}</div>
                        </div>
                    </Link>
                )
            }
        </div>
    );
};
export default NavigationSidebar;