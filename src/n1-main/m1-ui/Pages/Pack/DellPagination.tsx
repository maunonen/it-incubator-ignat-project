import React from 'react';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      // fontFamily: [
      //   '-apple-system',
      //   'BlinkMacSystemFont',
      //   '"Segoe UI"',
      //   'Roboto',
      //   '"Helvetica Neue"',
      //   'Arial',
      //   'sans-serif',
      //   '"Apple Color Emoji"',
      //   '"Segoe UI Emoji"',
      //   '"Segoe UI Symbol"',
      // ].join(','),
      // '&:focus': {
      //   borderRadius: 4,
      //   borderColor: '#80bdff',
      //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      // },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

export default function Pagination() {
  const classes = useStyles();
  const [numberPacks, setAge] = React.useState('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };
  return (
      <div>
        <Grid  container direction="row" justifyContent="center" alignItems="center">
            <Typography id="range-slider" gutterBottom>
            Show
            </Typography>
            <FormControl className={classes.margin}>
            {/* <InputLabel htmlFor="demo-customized-select-native">number</InputLabel> */}
            <NativeSelect
            id="demo-customized-select-native"
            value={numberPacks}
            onChange={handleChange}
            input={<BootstrapInput />}
            >
            <option aria-label="None" value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
            </NativeSelect>
        </FormControl>
        <Typography id="range-slider" gutterBottom>
            Cards per Page
        </Typography>
      </Grid>
    </div>
  );
}
