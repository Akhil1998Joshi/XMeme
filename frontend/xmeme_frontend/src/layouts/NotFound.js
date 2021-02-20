import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Image from '../assets/404.svg'
import { useHistory } from 'react-router-dom';

const TextTypography = withStyles({
    root: {
        fontFamily: "Open Sans, sans-serif !important",
        "@media (max-width: 900px)": {
            fontSize: "2rem",
            fontWeight: "bold",
            lineHeight: "40px",
        },
    }
})(Typography);


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
        marginTop: theme.spacing(8),
    },
    image: {
        marginTop: 30,
        display: 'inline-block',
        maxWidth: '100%',
        width: 560
    },
    container: {
    },
    fontChange: {
        "& .MuiTypography-h3": {
            fontFamily: "Open Sans, sans-serif !important",
        }
    },
    margin: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '30px',
        "@media (max-width: 900px)": {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        backgroundColor: '#d14a33',
        color: '#fff',
        transition: '0.5s',
        fontFamily: "Open Sans, sans-serif",
        "&:hover": {
            backgroundColor: "#bf3029"
        }
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }

}));

const NotFound = (props) => {
    const { errorMsg } = props.location.state || {};
    const classes = useStyles();

    const history = useHistory();

    const handleBack = () => {
        history.push("/");
    }
    return (
        <div>
            <Box
                display="flex"
                flexDirection="column"
                height="100vh"
                justifyContent="center"
                style={{ padding: "30px" }}
            >
                <Container maxWidth="md" className={classes.container}>
                    <TextTypography
                        align="center"
                        color="textPrimary"
                        variant="h3"
                        className={classes.fontChange}
                    >
                        404: The page you are looking for isn’t here
          </TextTypography>
                    {errorMsg ?
                        <TextTypography
                            align="center"
                            style={{ color: "#bf3029", fontWeight: "700", lineHeight: "30px", fontSize: "1rem" }}
                            variant="subtitle1"
                        >{errorMsg.message}<span style={{ color: "#000" }}> , Please Go Back</span></TextTypography> : <TextTypography
                            align="center"
                            color="textPrimary"
                            style={{ fontSize: "1rem", fontWeight: "700", lineHeight: "30px", }}
                            variant="subtitle1"> You either tried some shady route or you came here by mistake.Whichever it is, try using the Go Back Button</TextTypography>

                    }
                    <Box textAlign="center">
                        <img
                            alt="Under development"
                            className={classes.image}
                            src={Image}
                        />
                    </Box>
                    <Button variant="contained" size="large" className={classes.margin} onClick={handleBack}>
                        <ArrowBackIcon fontSize="inherit" /> BACK TO HOME
                    </Button>
                </Container>
            </Box>
        </div >
    )

}


export default NotFound;