import React from 'react'
import { useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/redux/store";
import {useFormik} from "formik";
import * as Yup from 'yup';
import { Redirect} from "react-router-dom";

import {Card, createStyles,

    Grid,  makeStyles,
     Theme, Typography
} from "@material-ui/core";
import MessageIcon from '../common/icons/MessageIcon';

const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center",
        padding: "30px 30px",
        maxWidth: "413px",
    },
    formSubtitle: {
        marginBottom: "20px",
    },
    formDescription: {
        marginTop: "20px",
        marginBottom: "40px",
    },
    formLinkTitle: {
        paddingTop: "30px",
        paddingBottom: "15px",
    },
    formButtonBlock: {
        margin: "0px 35px"
    },
    formIcon: {
        /*fontSize: "64px",*/
        margin: "25px 0px",
        color: "#21268F",
        opacity: 0.7,
    }
}))


const RestorePassPage: React.FC = () => {

    const classes = useStyles()
    const isLoggedIn = useSelector((state: AppStoreType) => state.auth.isLoggedIn)

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{minHeight: '100vh'}}
    >
        <Card
            className={classes.root}
        >
            <Grid item>
                <Typography
                    variant={"h1"}
                    className={classes.formTitle}
                >It-incubator</Typography>
                <div className={classes.formIcon}>
                    <MessageIcon
                        size="72px"
                    />
                </div>
                <Typography
                    variant={"h2"}
                    className={classes.formSubtitle}
                >Forget your password</Typography>
                <Typography
                    variant={"body1"}
                    className={classes.formDescription}
                >
                    We’ve sent an Email with instructions to example@mail.com
                </Typography>
            </Grid>
        </Card>
    </Grid>
}
export default RestorePassPage