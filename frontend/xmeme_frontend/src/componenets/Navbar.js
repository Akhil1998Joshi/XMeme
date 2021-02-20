import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, makeStyles, Button, IconButton, Drawer, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "#fffefe",
        paddingRight: "79px",
        paddingLeft: "118px",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        },
        position: "relative",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 'bold',
        size: "20px",
        paddingTop: "0px",
        marginLeft: "38px",
        height: '73px',
        transition: '0.5s',
        color: "#000",
        borderRadius: "0px",
        textDecoration: "none",
        "&:hover": {
            backgroundColor: '#d14a33',
            color: '#fff',
            borderRadius: '0px',
            height: '73px',
        }
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    drawerContainer: {
        padding: "20px 30px",
    },
    logoimg: {
        "@media (max-width: 900px)": {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        },

    },
    iconMarginSetting: {
        marginLeft: '0px',

    }
}));


const headersData = [
    {
        label: "Home",
        href: "/memes",
    },
    {
        label: "Swagger",
        href: "/swagger",
    },
    {
        label: "Contact",
        href: "mailto:name@email.com",
    },
];



const Navbar = () => {

    const { header, menuButton, toolbar, drawerContainer, logoimg, iconMarginSetting } = useStyles();

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false
    })

    const { mobileView, drawerOpen } = state;
    let isRendered = useRef(false);


    useEffect(() => {
        isRendered = true;
        const ac = new AbortController();

        const setResponsiveness = () => {
            if (isRendered) {
                return window.innerWidth < 900
                    ? setState((prevState) => ({ ...prevState, mobileView: true }))
                    : setState((prevState) => ({ ...prevState, mobileView: false }));
            }
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
        return () => ac.abort();
    }, []);

    const openTab = () => {
        window.open('http://ec2-52-66-245-92.ap-south-1.compute.amazonaws.com:8081/swagger-ui.html#/');
    }



    const displayDesktop = () => {
        return <Toolbar className={toolbar}><img src={Logo} height="73px" width="190px" /><div>{getMenuButtons()}</div></Toolbar>;
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }));

        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Toolbar>
                <IconButton
                    {...{
                        edge: "start",
                        "aria-label": "menu",
                        "aria-haspopup": "true",
                        onClick: handleDrawerOpen,
                    }}
                    className={iconMarginSetting}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    {...{
                        anchor: "left",
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
                </Drawer>
                <div className={logoimg}><img src={Logo} height="73px" width="190px" /></div>
            </Toolbar>
        );
    };

    const getMenuButtons = () => {
        // return headersData.map(({ label, href }) => {
        return (
            <div>
                <Link to="/memes"
                    style={{
                        textDecoration: "none",
                        padding: "0px",
                        margin: "0px"
                    }}

                >
                    <Button className={menuButton}>Home</Button>

                </Link >

                <Link to="/#" onClick={openTab}
                    style={{
                        textDecoration: "none",
                        padding: "0px",
                        margin: "0px"
                    }}

                >
                    <Button className={menuButton}>Swagger</Button>

                </Link >
            </div>
        );
        // });
    };

    const getDrawerChoices = () => {
        // return headersData.map(({ label, href }) => {
        return (
            <div>
                <Link to="/memes"
                    style={{
                        color: "#000",
                        backgroundColor: '#fff',
                        textDecoration: "none",
                        padding: "0px",
                        margin: "0px"
                    }}

                >
                    <MenuItem style={{
                        marginRight: "10px", color: "#000", fontFamily: "Open Sans, sans-serif",
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        width: '150px',
                        backgroundColor: '#fff',
                    }}
                    >Home</MenuItem>

                </Link>
                <Link to="/#" onClick={openTab}
                    style={{
                        color: "#000",
                        backgroundColor: '#fff',
                        textDecoration: "none",
                        padding: "0px",
                        margin: "0px"
                    }}

                >
                    <MenuItem style={{
                        marginRight: "10px", color: "#000", fontFamily: "Open Sans, sans-serif",
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        width: '150px',
                        backgroundColor: '#fff',
                    }}
                    >Swagger</MenuItem>

                </Link>
            </div>
        );
        // });
    };

    return (
        <AppBar className={header}>
            {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
    )
}

export default Navbar;