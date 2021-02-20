import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import Navbar from '../../componenets/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FaceIcon from '@material-ui/icons/Face';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateButton from '../../componenets/CreateButton';
import EditIcon from '@material-ui/icons/Edit';
import Footer from '../../componenets/Footer';
import { Link, useHistory } from 'react-router-dom';
// import CardComponent from '../../componenets/CardComponent';
import Api from '../../constants/Api';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Popup from "../../componenets/EditPostPopup";
import moment from 'moment';



const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        padding: theme.spacing(0, 8, 0, 8),
        marginBottom: '20px',
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
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
            textOverflow: 'ellipsis',
            maxWidth: '98%',
            whiteSpace: 'nowrap',
            overflow: 'hidden!important',
        },
    },

}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Home = () => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = useState([]);
    const [memeDetail, setMemeDetails] = useState([]);

    let isRendered = useRef(false);

    const displayError = () => {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }

    useEffect(() => {
        isRendered = true;
        const ac = new AbortController();
        const fetchMeme = async () => {
            await Api.showAllMemes().then((res) => {
                if (isRendered) {
                    setMemeDetails(res.data);
                }
            })

        }
        fetchMeme()
        return () => {
            isRendered = false;
            displayError();
            ac.abort();
        }
    }, [memeDetail]);

    const handleView = (event) => {
        const id = event.currentTarget.value;
        // console.log(id);
        history.push(`/meme/${id}`);
    }

    const handleEdit = (event) => {
        const meme = event.currentTarget.value;
        setValue(meme);
        setOpen(true);
    }

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar />
            <main>

                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <CreateButton />
                </div>

                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {memeDetail.map((meme) => (
                            <Grid item key={meme.meme_id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardHeader
                                        avatar={
                                            <Avatar className={classes.avatar}>
                                                <FaceIcon />
                                            </Avatar>

                                        }
                                        title={meme.name}
                                        subheader={moment(meme.createDateTime).format("LL")}
                                        className={classes.cardHeader}
                                    />
                                    <div className="media-container">
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={meme.url}
                                            lazyloading="true"
                                        />
                                    </div>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="body2" component="p">
                                            {meme.caption}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton aria-label="view" value={meme.meme_id} onClick={handleView}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton aria-label="edit" value={meme.meme_id} onClick={handleEdit}>
                                            <EditIcon />
                                        </IconButton>
                                        {/* <IconButton aria-label="share">
                                            <ShareIcon />
                                        </IconButton> */}

                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Popup open={open} setOpen={setOpen} value={value} setValue={setValue} />
            </main>
            <Footer />
        </React.Fragment >
    );
}
export default Home;