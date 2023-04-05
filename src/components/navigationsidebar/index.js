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
/*        {
            label: 'Register',
            link: '/sign-up',
            activePaths: ['sign-up'],
            iconClassName: "fa-solid fa-user"
        },
        {
            label: 'Login',
            link: '/login',
            activePaths: ['login'],
            iconClassName: "fa-solid fa-door-open"
        },*/
        {
            label: 'Profile',
            link: '/profile/todos',
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
        },
        {
            label: 'Hoedown',
            link: '/hoedown',
            activePaths: ['hoedown'],
            iconClassName: "fa-solid fa-music"
        }
    ]
    return (
        <div>
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
            <div>
                <div>
                    <Link className="rounded-pill btn btn-dark mt-2 fw-bold w-100"
                          to="/sign-up">
                        Register
                    </Link>
                </div>
                <div>
                    <Link className="rounded-pill btn btn-primary mt-2 fw-bold w-100"
                          to="/login">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default NavigationSidebar;