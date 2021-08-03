import React from 'react'
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../common/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../common/c5-SuperSelect/SuperSelect";
import SuperRadio from "../common/c6-SuperRadio/SuperRadio";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../m2-bll/redux/store";
import {loggedInAC} from "../../m2-bll/redux/auth-reducer";

const TestPage: React.FC = () => {
    const isLoggedIn = useSelector((state: AppStoreType) => (state.auth.isLoggedIn))
    const dispatch = useDispatch();
    const handleTestButton = () => {
        dispatch(loggedInAC(!isLoggedIn, "error from"))
    }
    console.log(isLoggedIn)
    return (
        <>
            ddddddddd
            <h1>Test page</h1>
            <p>Is Logged In : {isLoggedIn ? <span>True</span> : <span>False</span>}</p>
            <SuperInputText/>
            <br/>
            <SuperButton onClick={handleTestButton}>Test button</SuperButton>
            <div>
                <SuperCheckbox>Some checkbox 1</SuperCheckbox>
                <SuperCheckbox checked={true}>Some checkbox 1</SuperCheckbox>
                <SuperCheckbox checked={false}>Some checkbox 2</SuperCheckbox>
            </div>
            <SuperEditableSpan></SuperEditableSpan>
            <SuperSelect></SuperSelect>
            <SuperRadio options={["options1", "options2"]}></SuperRadio>
        </>
    )
}
export default TestPage
