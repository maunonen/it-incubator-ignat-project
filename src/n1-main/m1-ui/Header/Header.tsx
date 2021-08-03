import React from 'react'
import {NavLink, useHistory, useParams} from 'react-router-dom'
import s from './Header.module.css'
import {PATH} from "../Routes";
import {
    AppBar,
    Button, createStyles,
    IconButton,
    LinearProgress,
    Link, List,
    ListItem,
    ListItemIcon, ListItemText,
    makeStyles,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/redux/store";
import CardsIcon from "../common/icons/CardsIcon";
import ProfileIcon from "../common/icons/ProfileIcon";

const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        backgroundColor: "#EBE0E9",

    },
    listBlock : {
        display : "flex",
        flexDirection: "row"
    },
    iconBlock : {
    },
    menuItem: {
        color: "#2D2E46",
    }
}))

const Header: React.FC = () => {
    const {appStatus} = useSelector((state: AppStoreType) => state.app)
    const history = useHistory()
    const classes = useStyles()
    return (
        <div>
            <AppBar
                position="static"
                className={classes.root}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        aria-label="menu"
                        className={classes.itemMenu}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h1">
                        It-Incubator
                    </Typography>
                    <div>
                        <Button
                            color="inherit"
                            className={classes.menuItem}
                            onClick={() => history.push(PATH.LOGIN)}
                        >Login</Button>
                        <Button
                            color="inherit"
                            className={classes.menuItem}
                            onClick={() => history.push(PATH.SIGNUP)}
                        >Sign up</Button>
                        <Button
                            color="inherit"
                            className={classes.menuItem}
                            onClick={() => history.push(PATH.PROFILE)}
                        >Profile</Button>
                        <Button
                            color="inherit"
                            className={classes.menuItem}
                            onClick={() => history.push(PATH.RESTORE_PASS)}
                        >Restore Pass</Button>
                        <Button
                            color="inherit"
                            className={classes.menuItem}
                            onClick={() => history.push(PATH.NEW_PASS)}
                        >New Pass</Button>
                        <Button
                            color="inherit"
                            className={classes.menuItem}
                            onClick={() => history.push(PATH.TEST_PAGE)}
                        >Test Page</Button>

                        {/*------------------ add button PACK in to header -------------- */}
                        <Button
                            color="inherit"
                            className={classes.menuItem}
                            onClick={() => history.push(PATH.PACK)}
                        >Pack</Button>

                       {/* -------------------------------------------------------------   */}

                    </div>
                    {/*<List
                        component="nav"
                        aria-label="main mailbox folders"
                        className={classes.listBlock}
                    >
                        <ListItem button>
                            <ListItemIcon className={classes.iconBlock}>
                                <CardsIcon size={"40"}/>
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <ProfileIcon size={"25"}/>
                            </ListItemIcon>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                    </List>*/}
                </Toolbar>
                {appStatus === 'loading' && <LinearProgress color={"secondary"}/>}
            </AppBar>
            {/*<nav className={s.menu}>
                <div className={s.content}>
                    <NavLink
                        to={PATH.LOGIN}
                        className={s.item}
                    >Login</NavLink>
                    <NavLink
                        to={PATH.SIGNUP}
                        className={s.item}
                    >Sign up</NavLink>
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
                    <div className={s.item + ' ' + s.waffel}>menu</div>
                </div>
            </nav>*/}
        </div>
    )
}

export default Header
