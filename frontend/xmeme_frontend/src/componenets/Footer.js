import React from 'react';
import { AppBar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(({ palette, spacing }) => ({
    footer: {
        borderTop: '1px solid',
        borderColor: palette.grey[200],
        padding: spacing(2),
        backgroundColor: "#212529",
        color: '#fff',
        textAlign: 'center',
    },
    fontChange: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: '500',

    },
    '@keyframes blinker': {
        "0%": { opacity: 0 },
        "50%": { opacity: 0.5 },
        "100%": { opacity: 1 },
    },
    iconStyle: {
        fontSize: '18px',
        color: '#FF69B4',
        animationName: '$blinker',
        animationDuration: '2s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
    },
    // footerPosition: {
    //     position: 'relative',
    //     bottom: '0',
    //     width: '100vw',
    // }
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography variant="body1" className={classes.fontChange}>MADE BY AKHIL JOSHI  <FavoriteIcon className={classes.iconStyle} /></Typography>
            </Container>
        </footer>
    )

}

export default Footer;