import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Header.module.css'
import {PATH} from "../Routes";

function Header() {
    return (
        <div>

            <nav className={s.menu}>
                <div className={s.content}>
                    <NavLink
                        to={PATH.LOGIN}
                        className={s.item}
                    >Login</NavLink>
                    <NavLink
                        to={PATH.PROFILE}
                        className={s.item}
                    >Profile</NavLink>
                    <NavLink
                        to={PATH.RESTORE_PASS}
                        className={s.item}
                    >Restore Pass</NavLink>
                    <NavLink
                        to={PATH.NEW_PASS}
                        className={s.item}
                    >New Pass</NavLink>
                    <NavLink
                        to={PATH.TEST_PAGE}
                        className={s.item}
                    >Test Page</NavLink>
                    {/*<div className={s.item + ' ' + s.waffel}>menu</div>*/}
                </div>
            </nav>
        </div>
    )
}

export default Header
