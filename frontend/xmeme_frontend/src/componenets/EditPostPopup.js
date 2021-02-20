import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Api from '../constants/Api';
import isImageUrl from 'is-image-url';

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
                borderRadius: '0px',   // - Set the Input border
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

const EditPostPopup = (props) => {
    const classes = useStyles();
    // console.log(props);
    const { open, setOpen, value, setValue } = props;
    const [memeDetails, setMemeDetails] = useState(
        {
            caption: '',
            url: '',
            errorCaption: false,
            errorUrl: false,
            helperTextCaption: '',
            helperTextUrl: ''
        }
    );


    const history = useHistory();
    const location = useLocation();
    const handleChange = (event) => {
        setMemeDetails({ ...memeDetails, [event.target.name]: event.target.value })
    }

    let isRendered = useRef(false);

    useEffect(() => {
        isRendered = true;
        const ac = new AbortController();
        Api.showMemeById(value).then((res) => {
            if (isRendered) {
                setMemeDetails(res.data);
            }

        })
        return () => {
            isRendered = false;
            ac.abort();
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        // const { name, caption, url } = memeDetails;
        // const meme = { name, caption, url }

        if (memeDetails.caption == null && memeDetails.url == null) {

            setMemeDetails({
                ...memeDetails,
                helperTextCaption: 'Please fill the fields.',
                helperTextUrl: 'Please fill the fields.',
                errorCaption: true,
                errorUrl: true
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
            Api.updateMeme(memeDetails, value).then((res) => {
                setMemeDetails([]);
                history.push(location.pathname);


            }).catch((error) => {
                console.log(error.response)
            })

            setOpen(false);
        }


    }



    const handleClose = (e) => {
        e.preventDefault();
        setMemeDetails([]);
        setOpen(false);
    };




    return (
        <Dialog open={open} value={value}>
            <DialogContent>
                <Container component="main" className={classes.dialogBox} onSubmit={handleSubmit}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <form className={classes.form} >
                            <Grid container spacing={2}>
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
        </Dialog>
    )

}

export default EditPostPopup;