import {createMuiTheme} from "@material-ui/core";

export const muiTheme = createMuiTheme({
    palette: {
        primary: {
            light: '#b8f04a',
            main: '#84bd00',
            dark: '#518c00'
        },
        secondary: {
            light: '#e35ba2',
            main: '#ae2573',
            dark: '#7a0048'
        },
        error: {
            main: '#ae2573',
        },
        warning: {
            main : '#ffa500'
        },
        info : {
            main: '#009cde',
        },
        text : {
            primary: '#666666',
            secondary: '#b3b3b3',
        }
    },
});
