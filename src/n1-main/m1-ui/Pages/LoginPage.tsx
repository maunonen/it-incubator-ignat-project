import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/redux/store";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {NavLink, Redirect} from "react-router-dom";
import {Button, Card, createStyles, FormControl, FormGroup, Checkbox,
        Grid, makeStyles, TextField, Theme, Typography, FormControlLabel
} from "@material-ui/core";
import {loggedInTC} from "../../m2-bll/redux/auth-reducer";


const useStyles = makeStyles<Theme>(theme => createStyles({
    root: {
        textAlign: "center",
        padding: "30px 30px",
        maxWidth : "413px",
    },
    formTitle: {
        marginBottom: "30px",
    },
    formDescription : {
        marginTop : "20px",
        marginBottom : "40px",
    },
    formButtonBlock : {
        margin: "0px 35px"
    }
}))


type FormikErrorType = {email?: string}

const LoginPage: React.FC = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppStoreType) => state.auth.isLoggedIn)

    const restoreSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            email: 'nya-admin@nya.nya',
            password: '1qazxcvBG',
            remember: true
        },
        validationSchema: restoreSchema,
        onSubmit: values => {
            dispatch(loggedInTC(values.email, values.password, values.remember))
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
        <Card className={classes.root}>
            <Grid item>
                <form onSubmit={formik.handleSubmit}>
                    <Typography
                        variant={"h1"}
                        className={classes.formTitle}
                    >Login
                    </Typography>
                    <Typography
                        variant={"body1"}
                        className={classes.formDescription}
                        align={"left"}
                    > Enter your email address and password
                    </Typography>

                    <FormControl>
                        <FormGroup>
                            <TextField
                                type="email"
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            { formik.touched.email && formik.errors.email &&
                              <div style={{color: 'red'}}>{formik.errors.email}</div>
                            }
                            <TextField
                                type="password"
                                label="password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />

                             <FormControlLabel
                                  label={'Remember me'}
                                  control={<Checkbox/>}
                                 // onChange={changeRememberCheckboxHandler}
                                  {...formik.getFieldProps('remember')}
                                />






                            {/*-----value less then------------------------*/}
                            { formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>
                            }
                            {/*-----------------------------*/}




                            <Button
                                type={'submit'}
                                variant={'contained'}
                                className={classes.formButtonBlock}
                                color={'primary'}>Loggin</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Card>
    </Grid>
}
export default LoginPage



// import React, {useState} from 'react'
// import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
// import {useDispatch, useSelector} from "react-redux";
// import {loggedInTC} from "../../m2-bll/redux/auth-reducer"
// import {AppStoreType} from "../../m2-bll/redux/store";
// import {Redirect} from "react-router-dom";
// import {PATH} from "../Routes";
//
//
//
// export const LoginPage = () => {
//
//     const isLoggedIn = useSelector<AppStoreType, any>(state => state.auth)
//
//     const [email, setEmail] = useState<string>("nya-admin@nya.nya");
//     const [password, setPass] = useState<string>("1qazxcvBG");
//     const [rememberMe, setRememberMe] = useState<boolean>(false);
//     const dispatch = useDispatch()
//
//
//     const submitHandler = (event: any) => {
//         event.preventDefault()
//
//         dispatch(loggedInTC(email, password, rememberMe))
//     }
//
//     const changeInputEmailHandler = (event: any) => {
//         setEmail(event.currentTarget.value)
//     }
//
//     const changeInputPassHandler = (event: any) => {
//         setPass(event.currentTarget.value)
//     }
//
//     const changeRememberCheckboxHandler = (event: any) => {
//         setRememberMe(event.currentTarget.checked)
//     }
//
//     if (isLoggedIn.isLoggedIn) {
//         return (
//             <Redirect from={PATH.ALL_ROUTES} to={"Profile"}/>
//         )
//     } else {
//         return  (<Grid container justify="center">
//             <Grid item xs={4}>
//                 <form onSubmit={submitHandler}>
//                     <FormControl>
//                         <FormLabel>
//                             Login
//                             <br/>
//                             {isLoggedIn.error}
//                         </FormLabel>
//                         <FormGroup>
//                             <TextField
//                                 label="Email"
//                                 margin="normal"
//                                 name="Email"
//                                 value={email}
//                                 onChange={changeInputEmailHandler}
//                             />
//                             <TextField
//                                 type="password"
//                                 label="Password"
//                                 margin="normal"
//                                 value={password}
//                                 onChange={changeInputPassHandler}
//                             />
//                             <FormControlLabel
//                                 label={'Remember me'}
//                                 control={<Checkbox/>}
//                                 onChange={changeRememberCheckboxHandler}
//                             />
//                             <Button type={'submit'}
//                                     variant={'contained'}
//                                     color={'primary'}>
//                                 Login
//                             </Button>
//                         </FormGroup>
//                     </FormControl>
//                 </form>
//             </Grid>
//         </Grid>)
//     }
// }
//
// export default LoginPage
