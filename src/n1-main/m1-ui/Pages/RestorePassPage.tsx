import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/redux/store";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {NavLink, Redirect} from "react-router-dom";
import {
    Button,
    Card,
    Checkbox, createStyles,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid, Link, makeStyles,
    TextField, Theme, Typography
} from "@material-ui/core";
import {PATH} from "../Routes";

const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center",
        padding: "30px 30px",
        maxWidth : "413px",
    },
    formTitle: {
        marginBottom: "30px",
    },
    formSubtitle: {
        marginBottom: "20px",
    },
    formDescription : {
        marginTop : "20px",
        marginBottom : "40px",
    },
    formLinkTitle : {
        paddingTop: "30px",
        paddingBottom: "15px",
    },
    formButtonBlock : {
        margin: "0px 35px"
    }
}))


const RestorePassPage: React.FC = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppStoreType) => state.auth.isLoggedIn)

    type FormikErrorType = {
        email?: string
    }

    const restoreSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: restoreSchema,
        onSubmit: values => {
            alert('Submit forgot request')
            /*dispatch(loginTC(values))*/
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return <Grid
        container
        justify="center"
        alignItems="center"
        style={{minHeight: '100vh'}}
    >
        <Card
            className={classes.root}
        >
            <Grid item>
                <form onSubmit={formik.handleSubmit}>
                    <Typography
                        variant={"h1"}
                        className={classes.formTitle}
                    >It-incubator</Typography>
                    <Typography
                        variant={"h2"}
                        className={classes.formSubtitle}
                    >Forget your password</Typography>
                    <FormControl>
                        <FormGroup>
                            <TextField
                                type="email"
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            {
                                formik.touched.email && formik.errors.email &&
                                <div style={{color: 'red'}}>{formik.errors.email}</div>
                            }
                            <Typography
                                variant={"body1"}
                                className={classes.formDescription}
                                align={"left"}
                            >
                                Enter your email address and we will send you further instructions
                            </Typography>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                className={classes.formButtonBlock}
                                color={'primary'}>Send instructions</Button>
                            <Typography
                                variant={"body1"}
                                className={classes.formLinkTitle}
                            >Did you remember your password</Typography>
                            <Link
                                component={NavLink}
                                to={PATH.LOGIN}
                                color={"textPrimary"}
                            >Try logging in
                            </Link>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Card>
    </Grid>
}
export default RestorePassPage