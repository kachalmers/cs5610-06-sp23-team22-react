import React from "react";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

const NavigationSidebar = () => {
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const active = paths[1];
    const screenChoices = [
        {
            label: 'AppName',
            link: '/appname',
            activePaths: [],
            iconClassName: "bi bi-star"
        },
        {
            label: 'Login',
            link: '/login',
            activePaths: ['login'],
            iconClassName: "bi bi-door-open"
        },
        {
            label: 'Profile',
            link: '/profile',
            activePaths: ['profile','edit-profile'],
            iconClassName: "bi bi-person"
        },
        {
            label: 'To-do',
            link: '/to-do',
            activePaths: ['to-do','',undefined],
            iconClassName: "bi bi-list-stars"
        },
        {
            label: 'Feed',
            link: '/feed',
            activePaths: ['feed'],
            iconClassName: "bi bi-view-list"
        },
        {
            label: 'Find friends',
            link: '/find-friends',
            activePaths: ['find-friends'],
            iconClassName: "bi bi-person-plus"
        }
    ]
    return (
        <div className="list-group">
            {
                screenChoices.map(screenChoice =>
                    <Link to={screenChoice.link} className={`list-group-item ${screenChoice.activePaths.includes(active)?'active':''}`}>
                        <div className="row justify-content-start align-items-center">
                            {
                                screenChoice.iconClassName !== '' ?
                                <div className="col-3">
                                    <div><i className={screenChoice.iconClassName}></i></div>
                                </div> : ''
                            }
                            <div className="col">
                                <div className="d-none d-xl-block">{screenChoice.label}</div>
                            </div>
                        </div>
                    </Link>
                )
            }
        </div>
    );
};
export default NavigationSidebar;