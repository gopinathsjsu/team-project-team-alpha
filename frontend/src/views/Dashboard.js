import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {
    Typography,
    Avatar,
    Grid,
    Box
} from '@material-ui/core';
import Carousel from 'react-bootstrap/Carousel';
import Food1 from '../images/Food1.jpg';
import Food2 from '../images/Food2.jpg';
import Food3 from '../images/Food3.jpg';
import Food4 from '../images/Food4.jpg';
import Food5 from '../images/Food5.jpg';
import Food6 from '../images/Food6.jpg';
import Food7 from '../images/Food7.jpg';
import Food8 from '../images/Food8.jpg';
import Food9 from '../images/Food9.jpg';
import Food10 from '../images/Food10.jpg';
import trivago from "../images/trivago.jpg"
import Bali from "../images/Bali.jpg"
//import Typed  from 'react-typed';
import avatar from '../images/avatar.svg';
import Login from './Login'

// CSS styles
const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: theme.spacing(1)
    },
    title: {
        color: 'tomato'
    },
    subtitle: {
        color: 'tan',
        marginBottom: '3rem'
    },
    typedContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        textAlign: 'center',
        zIndex: 1
    },
    container: {
        marginTop: '0px',
    }
}))
const Dashboard = () => {
    const classes = useStyles();
    const imagesList = [
        {url: Food1, quote: 'Quote 1'},
        {url: Food2, quote: 'Quote 2'},
        {url: Food3, quote: 'Quote 3'},
        {url: Food4, quote: 'Quote 4'},
        {url: Food5, quote: 'Quote 5'},
        {url: Food6, quote: 'Quote 6'},
        {url: Food7, quote: 'Quote 7'},
        {url: Food8, quote: 'Quote 8'},
        {url: Food9, quote: 'Quote 9'},
        {url: Food10, quote: 'Quote 10'}
    ];

    const getImages = () => {
        for (let i = 0; i < imagesList.length; i++) {
            return (
                <Carousel.Item style={{'height':"620px"}} >  
                    <img style={{'height':"620px"}}  
                    className="d-block w-100"  
                    src={trivago} alt='' />  
                    <Carousel.Caption>  
                        <h3>{imagesList[i].quote}</h3>  
                    </Carousel.Caption>  
                </Carousel.Item  >
                
            )
        }
    }
    return (
        <>
        <Login />
        <Box component='div' className={classes.container}>
            <Grid container justifyContent="center">
            <div className='container-fluid' >  
                <div className="row title" style={{ marginBottom: "20px" }} >  
                    </div>  
                        </div>  
                            <div className='container-fluid' >  
                        {/* <Carousel> */}
                        {/* <Carousel.Item style={{'height':"620px"}} >   */}
                                <img style={{'height':"630px", 'width': '1510px'}}  
                                className="d-block w-100"  
                                src={Bali} alt='' />  
                                
                                {/* <Carousel.Caption>   */}
                                    {/* <h3>ZFood 1</h3>   */}
                                {/* </Carousel.Caption>   */}
                            {/* </Carousel.Item  > */}
                            
                        {/* </Carousel>   */}
                    </div>  
            </Grid>
        </Box>
        </>
    )
}

export default Dashboard
