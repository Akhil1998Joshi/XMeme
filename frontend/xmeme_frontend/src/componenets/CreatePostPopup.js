import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Api from '../constants/Api';
import isImageUrl from 'is-image-url';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        borderRadius: "0px",
        backgroundColor: '#1cad7f',
        color: '#fff',
        "&:hover": {
            backgroundColor: '#1ECD97',
        }
    },
    cancel: {
        margin: theme.spacing(3, 0, 2),
        borderRadius: "0px",
        backgroundColor: '#bf3029',
        color: '#fff',
        "&:hover": {
            backgroundColor: '#d14a33',
        }
    },
    // dialogBox: {
    //     fontFamily: "Open Sans, sans-serif !important",
    //     fontWeight: 'bold !important',
    // },
    textField: {
        '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
            '& fieldset': {            // - The <fieldset> inside the Input-root
                borderRadius: '0px',   // - Set the Input border radius
            },
            // '&:hover fieldset': {
            //     borderColor: 'yellow', // - Set the Input border when parent has :hover
            // },
            '&.Mui-focused fieldset': { // - Set the Input border when parent is focused 
                borderColor: '#1cad7f',

            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#1cad7f',
        },
    },

}));

const CreatePostPopup = (props) => {
    const classes = useStyles();
    const { open, setOpen } = props;
    const [openBar, setOpenBar] = React.useState(false);
    const [errorInfo, setErrorInfo] = useState([]);
    const [errorStatus, setErrorStatus] = useState([]);
    const [memeDetails, setMemeDetails] = useState(
        {
            name: '',
            caption: '',
            url: '',
            errorName: false,
            errorCaption: false,
            errorUrl: false,
            helperTextName: '',
            helperTextCaption: '',
            helperTextUrl: ''
        }
    );

    const history = useHistory();
    const _isMounted = useRef(true);

    const handleChange = (event) => {
        setMemeDetails({ ...memeDetails, [event.target.name]: event.target.value })
    }

    const displayError = () => {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }

    const clearState = () => {
        setMemeDetails({
            ...memeDetails,
            errorName: false,
            errorCaption: false,
            errorUrl: false,
            helperTextName: '',
            helperTextCaption: '',
            helperTextUrl: '',
        });
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleOpenSnackbar = () => {
        setOpenBar(true);
    }

    const handleCloseSnackbar = () => {
        setOpenBar(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // const { name, caption, url } = memeDetails;
        // const meme = { name, caption, url }
        const letters = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;

        if (memeDetails.name === '') {
            setMemeDetails({
                ...memeDetails,
                helperTextName: 'Please Enter Your Name',
                errorName: true
            })
        }

        else if (memeDetails.caption === '') {
            setMemeDetails({
                ...memeDetails,
                helperTextCaption: 'Please Enter Some Caption',
                errorCaption: true
            })
        }

        else if (memeDetails.url === '') {
            setMemeDetails({
                ...memeDetails,
                helperTextUrl: 'Please Enter The url',
                errorUrl: true
            })
        }

        else if (memeDetails.name === '' && memeDetails.caption === '' && memeDetails.url) {
            setMemeDetails({
                ...memeDetails,
                helperTextName: 'Please Enter Your Name',
                errorName: true,
                helperTextCaption: 'Please Enter Some Caption',
                errorCaption: true,
                helperTextUrl: 'Please Enter The url',
                errorUrl: true
            })
        }

        else if (memeDetails.name !== '' && !memeDetails.name.match(letters)) {
            setMemeDetails({
                ...memeDetails,
                helperTextName: 'Name should only have letters',
                errorName: true
            })
        }

        else if (memeDetails.caption != null && memeDetails.caption.length > 200) {
            setMemeDetails({
                ...memeDetails,
                helperTextCaption: 'Caption should not have more than 200 characters',
                errorCaption: true
            })
        }

        else if (memeDetails.url != null && !isImageUrl(memeDetails.url)) {
            setMemeDetails({
                ...memeDetails,
                helperTextUrl: 'Please Check url: Not a image or a correct url',
                errorUrl: true
            })
        }



        else {
            Api.createMeme(memeDetails).then((res) => {
                history.push('/');
                setOpen(false);

            }).catch((error) => {

                setErrorInfo(error.response.data.message)
                setErrorStatus(error.response.status)
                e.target.reset();
                setOpen(true);
                handleOpenSnackbar();

            })


        }

        displayError().then(clearState);

    }


    const handleClose = (e) => {
        e.preventDefault()
        setMemeDetails([]);
        history.push("/memes");
        setOpen(false);

    };









    return (
        <Dialog open={open}>
            <DialogContent>
                <Container component="main" className={classes.dialogBox} >
                    <CssBaseline />
                    <div className={classes.paper}>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            {memeDetails.errorName}
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        name="name"
                                        variant="outlined"
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        defaultValue={memeDetails.name}
                                        error={memeDetails.errorName}
                                        helperText={memeDetails.helperTextName}
                                        onChange={handleChange}
                                        // required
                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="caption"
                                        label="Caption"
                                        name="caption"
                                        defaultValue={memeDetails.caption}
                                        error={memeDetails.errorCaption}
                                        helperText={memeDetails.helperTextCaption}
                                        // required
                                        onChange={handleChange}

                                        className={classes.textField}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="url"
                                        label="URL"
                                        id="url"
                                        defaultValue={memeDetails.url}
                                        error={memeDetails.errorUrl}
                                        helperText={memeDetails.helperTextUrl}
                                        onChange={handleChange}
                                        // required
                                        className={classes.textField}
                                    />
                                </Grid>
                            </Grid>
                            <DialogActions>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.cancel}
                                    onClick={handleClose}
                                >
                                    Cancel
                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.submit}
                                >
                                    Submit
                </Button>
                            </DialogActions>
                        </form>
                    </div>
                </Container>
            </DialogContent>
            <Snackbar open={openBar} autoHideDuration={8000} onClose={handleCloseSnackbar}>
                <Alert severity="error">
                    ERROR - {errorStatus}: {errorInfo}
                </Alert>
            </Snackbar>
        </Dialog >
    )

}

export default CreatePostPopup;