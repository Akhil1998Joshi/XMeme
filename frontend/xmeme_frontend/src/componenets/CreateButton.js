import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Popup from "./CreatePostPopup";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(8, 0, 0, 4),
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
        "@media (max-width: 900px)": {
            fontSize: '1rem',
        },
    },
    spanSpacing: {
        paddingBottom: '0px',
        "@media (max-width: 900px)": {
            paddingTop: '0px',
            fontSize: '0.8rem',
        },
    },
}));

const CreateButton = () => {

    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    return (
        <div>
            <Fab variant="extended" aria-label="add" className={classes.margin} onClick={() => { setOpen(true) }}>
                <AddIcon className={classes.extendedIcon} /><span className={classes.spanSpacing}>Create Post</span>
            </Fab>
            <Popup open={open} setOpen={setOpen} />
        </div>
    )

}

export default CreateButton;