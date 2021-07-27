import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/redux/store";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {NavLink, Redirect} from "react-router-dom";
import {
    Button,
    Card,
    Checkbox, createStyles, FilledInput,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid, IconButton, Input, InputAdornment, Link, makeStyles,
    TextField, Theme, Typography
} from "@material-ui/core";
import {PATH} from "../Routes";
import {Visibility, VisibilityOff} from '@material-ui/icons';

const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center",
        padding: "30px 30px",
        maxWidth: "413px",
    },
    formTitle: {
        marginBottom: "30px",
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
        margin: "35px 35px"
    },
    errorBlock: {
        paddingTop: "20px"
    }
}))


const NewPassPage: React.FC = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppStoreType) => state.auth.isLoggedIn)
    const [showPassword, setShowPassword] = useState(false)

    type FormikErrorType = {
        password?: string
    }

    const restoreSchema = Yup.object().shape({
        password: Yup.string()
            .required('No password provided.')
            .min(8, 'Password is too short - should be at least 8 character.')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character.'),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: restoreSchema,
        onSubmit: values => {
            alert('Submit forgot request')
            /*dispatch(loginTC(values))*/
            formik.resetForm()
        },
    })

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDownPassword = () => {
        setShowPassword(!showPassword)
    }

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
                    >Create new pasword</Typography>
                    <FormControl>
                        <FormGroup>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder={"Password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                {...formik.getFieldProps('password')}

                            />
                            {
                                (formik.touched.password && formik.errors.password) ?
                                    <div
                                        style={{color: 'red'}}
                                        className={classes.errorBlock}

                                    >{formik.errors.password}</div> :
                                    <br/>
                            }
                            <Typography
                                variant={"body1"}
                                className={classes.formDescription}
                                align={"left"}
                            >
                                Create new password and we will send you further instructions to email
                            </Typography>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                className={classes.formButtonBlock}
                                color={'primary'}>Create new password</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Card>
    </Grid>
}
export default NewPassPage