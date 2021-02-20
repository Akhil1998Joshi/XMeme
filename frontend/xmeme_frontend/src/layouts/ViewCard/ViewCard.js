import React, { useState, useEffect, useRef } from 'react';
import './ViewCard.css';
// import CardComponent from '../../componenets/CardComponent';
import Navbar from '../../componenets/Navbar';
// import Grid from '@material-ui/core/Grid';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CreateButton from '../../componenets/CreateButton';
import Footer from '../../componenets/Footer';
// import Link from '@material-ui/core/Link';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
import { useHistory, useParams } from 'react-router-dom';
import Api from '../../constants/Api';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FaceIcon from '@material-ui/icons/Face';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Popup from "../../componenets/EditPostPopup";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        display: 'block',
        paddingLeft: '50vh',
        "@media (max-width: 900px)": {
            paddingLeft: '0',
        },

    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    },
    avatar: {
        backgroundColor: "#bf3029",
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardHeader: {
        '& .MuiCardHeader-title':
        {
            fontFamily: "Open Sans, sans-serif !important",
            fontWeight: 'bold !important',
        },
        '& .MuiCardHeader-root': {
            borderBottom: '2px solid #f0f0f0',
        }

    },
    cardContent: {
        flexGrow: 1,
        borderTop: '2px solid #f0f0f0',
        '& .MuiTypography-body2': {
            fontFamily: "Open Sans, sans-serif !important",
        },
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    imgContainer: {
        position: 'relative',
        height: '600px',
        width: '100%',
        "@media (max-width: 900px)": {
            position: 'relative',
            height: '293px',
            width: '100%',
        },
    },
    cardMedia: {
        "& .MuiCardMedia-root": {
            position: 'absolute',
            backgroundSize: 'cover !important',
            height: '100%',
            width: '100%',
            "@media (max-width: 900px)": {
                position: 'absolute',
                backgroundSize: 'contain !important',
                height: '100%',
                width: '100%',
            },

        },
        "&.MuiCardMedia-img": {
            objectFit: "contain",
        }
    }

}));


const ViewCard = () => {
    const classes = useStyles();
    let { id } = useParams();
    const [value, setValue] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [memeInfo, setMemeInfo] = useState([]);
    const [errorMsg, setErrorMsg] = React.useState([]);
    const history = useHistory();

    let isRendered = useRef(false);

    useEffect(() => {
        isRendered = true;
        const ac = new AbortController();
        Api.showMemeById(id).then((res) => {
            if (isRendered) {
                setMemeInfo(res.data);
            }
        }).catch((error) => {
            history.push({
                pathname: '/404',
                state: { errorMsg: error.response.data }

            })
        })

        return () => {
            isRendered = false;
            ac.abort();
        }
    }, [memeInfo])

    const handleEdit = (event) => {
        const meme = event.currentTarget.value;
        setValue(meme);
        setOpen(true);
    }

    const handleBack = () => {
        history.push('/memes');
    }

    return (
        <React.Fragment>
            <Navbar />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <CreateButton />
                </div>
                <Container className={classes.cardGrid} maxWidth="sm" >
                    {/* End hero unit */}
                    {/* <CardComponent /> */}
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar className={classes.avatar}>
                                    <FaceIcon />
                                </Avatar>

                            }
                            title={memeInfo.name}
                            subheader={moment(memeInfo.createDateTime).format('MMMM Do YYYY, h:mm:ss a')}
                            className={classes.cardHeader}
                            style={{}}
                        />
                        <div className={classes.imgContainer}>
                            <CardMedia
                                className={classes.cardMedia}
                                component="img"
                                src={memeInfo.url}
                            // // image="https://source.unsplash.com/random"
                            // image="https://i.pinimg.com/236x/a7/a8/3e/a7a83e156f69b3d8c505f6b596f4f1b2.jpg"
                            />
                        </div>
                        <CardContent className={classes.cardContent}>
                            <Typography variant="body2" component="p">
                                {memeInfo.caption}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton> */}

                            <IconButton aria-label="back" onClick={handleBack}>
                                <ArrowBackIcon />
                            </IconButton>
                            <IconButton aria-label="edit" value={id} onClick={handleEdit}>
                                <EditIcon />
                            </IconButton>
                            {/* 
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton> */}

                        </CardActions>
                    </Card>
                    <Popup open={open} setOpen={setOpen} value={value} setValue={setValue} />
                </Container>
            </main>
            <Footer />
        </React.Fragment>
    );
}

export default ViewCard;