import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/redux/store";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Redirect} from "react-router-dom";
import {
    Button,
    Card,
    Checkbox, createStyles,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid, makeStyles,
    TextField, Theme, Typography
} from "@material-ui/core";

const useStyles = makeStyles<Theme>( theme => createStyles({
    root: {
        textAlign: "center"
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
        style={{ minHeight: '100vh' }}
    >
        <Card
            className={classes.root}
        >
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <Typography>It-incubator</Typography>
                    <Typography>Forget your password</Typography>
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
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                        </FormGroup>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}>here
                                </a>
                            </p>
                            <p>Did you remember your password</p>
                        </FormLabel>
                    </FormControl>
                </form>
            </Grid>
        </Card>
    </Grid>
}
export default RestorePassPage