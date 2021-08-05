import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {AppStoreType} from "../../../m2-bll/redux/store";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function valuetext(value: number) {
    return `${value}`;
}

export default function RangeSlider() {
    const classes = useStyles();


    const pack = useSelector((state: AppStoreType) => state.pack);

    const [value, setValue] = React.useState<number[]>([20, 37]);

   const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };


    useEffect(() => {
        if ((pack.min!=null) && pack.max) {
            setValue([pack.min, pack.max])
        }
    }, [pack]);


    return (
        <div className={classes.root}>

            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}
