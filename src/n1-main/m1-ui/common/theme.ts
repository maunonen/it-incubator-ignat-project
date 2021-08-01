import {createTheme} from "@material-ui/core";

export const muiTheme = createTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    background: 'linear-gradient(to bottom, #EBE0E9 30%, #9A91C8 90%)',
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                },
            },
        },

        MuiButton: {
            root: {
                fontSize: '16px',
                color: "#21268F",
                fontFamily: 'SF UI Display, sans-serif',
                fontWeight: 500,
                fontStyle: "normal",
                lineHeight: "19px",
                borderRadius: "30px",
                textTransform: "none",
                padding: "8px 16px",
            },
        },
        MuiCard: {
            root: {
                borderRadius : "8px",
                backgroundColor : "#F9F9FE",
            }
        },
        MuiLink: {
            root : {
                fontSize: '16px',
                color: "#21268F",
                fontFamily: 'SF UI Display, sans-serif',
                fontWeight: 600,
                fontStyle: "normal",
                lineHeight: "24px",
                borderRadius: "30px",
            }
        },
        MuiTextField : {
            root : {
                fontWeight: 600,
                /*display : "flex",
                alignItems : "stretch",*/
                fontFamily: 'SF UI Display, sans-serif',
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "24px",
                color: "#2D2E46",
            }
        },
        MuiInput : {
            root : {
                fontWeight: 300,
                fontFamily: 'SF UI Display, sans-serif',
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "24px",
                color: "#2D2E46",
            }
        }
    },

    typography: {
        // Use the system font instead of the default Roboto font.
        h1: {
            fontWeight: 600,
            fontStyle: "normal",
            fontSize: "26px",
            lineHeight: "39px",
            fontFamily: "Poppins",
            color: "#2D2E46",
        },
        h2: {
            fontWeight: 600,
            fontStyle: "normal",
            fontSize: "22px",
            lineHeight: "33px",
            fontFamily: "Poppins",
            color: "#2D2E46",
        },
        body1: {
            fontWeight: 300,
            fontStyle: "normal",
            fontSize: "16px",
            lineHeight: "24px",
            fontFamily: 'SF UI Display, sans-serif',
            color: "#2D2E46",
            opacity: 0.6,
        },
        fontFamily: [
            'Poppins',
            'SF UI Display, sans-serif',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    palette: {
        primary: {
            light: '#b8f04a',
            main: '#21268F',
            dark: '#2D2E46'
        },
        secondary: {
            light: '#e35ba2',
            main: '#21268F',
            dark: '#21268F'
        },
        error: {
            main: '#ae2573',
        },
        warning: {
            main: '#ffa500'
        },
        info: {
            main: '#009cde',
        },
        text: {
            primary: '#666666',
            secondary: '#b3b3b3',
        },
    },

});
