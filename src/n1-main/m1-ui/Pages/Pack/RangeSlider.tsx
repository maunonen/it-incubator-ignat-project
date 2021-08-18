import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {AppStoreType} from "../../../m2-bll/redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setMinCardsCountAC, setMaxCardsCountAC} from "../../../m2-bll/redux/pack-reducer";

const useStyles = makeStyles({
    root: {
        /*width: 300,*/
    },
});

function valuetext(value: number) {
    return `${value}`;
}

export default function RangeSlider() {

    const pack = useSelector((state: AppStoreType) => state.pack);
    const [value, setValue] = React.useState<number[]>([0, 103]);

    const dispatch = useDispatch();

    const getAllPacks = () => {
        dispatch(getAllPacks())
    };

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    //    debounding можно перенести сюда из useEffect
    };


    useEffect(() => {
        if ((pack.min != null) && pack.min !== value[0]  && pack.max && pack.max !== value[1]) {
            setValue([pack.min, pack.max])
        }
    }, [pack]);



    useEffect(() => {
            const setTO = setTimeout(() => {
                 dispatch(setMinCardsCountAC(value[0]))
            }, 1500)
            return () => {
                clearTimeout(setTO)
            }
        }, [value[0]]
    );

    useEffect(() => {
            const setTO = setTimeout(() => {
                 dispatch(setMaxCardsCountAC(value[1]))
            }, 1500)
            return () => {
                clearTimeout(setTO)
            }
        }, [value[1]]
    );


    return (
        <>
            <Slider
                value={value}
                // onMouseUp...
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />

        </>
    );
}
