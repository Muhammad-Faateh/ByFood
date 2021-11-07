import React from 'react';
import { makeStyles } from '@mui/styles';
import {Button} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeFooter from '../../controls/HomeFooter';
import {useHistory} from 'react-router';

const useStyle = makeStyles({
    Body : {
        backgroundColor : 'white',
        paddingTop : '5rem',
        '& h1' : {
            textAlign : 'center',
            margin : '2rem 0px'
        },
        '& Button' : {
            marginLeft : '1rem',
            backgroundColor : '#E0475B',
            '&:hover' : {
                backgroundColor : '#E0475B',
            }
        },
        '& p':{
            margin : '1.5rem',
            fontSize : '1.1rem',
            paddingBottom : '1.5rem'
        }
    }

})

const PrivacyPage = () => {
    const classes = useStyle()
    const history = useHistory();
    return ( 
        <div>
            <div className = {classes.Body}>
            <Button variant = 'contained' startIcon = {<ArrowBackIosIcon />} onClick = {()=>history.push('/')} >Home</Button>
            <h1>Privacy Page</h1>
            <p>We place great emphasis on the need to respect the privacy of our customers and Web site visitors.</p>
            <p>The privacy of our users on the Internet is of the utmost importance to us. Since we, our related network of sites and our services do gather certain types of information about our users, we feel that you should completely understand the conditions and terms surrounding the gathering and use of information about those using our sites and services. This Privacy Policy Statement divulges what information we gather, how we use it, and how to correct or change it.</p>
            <p>Where you are required to register before accessing a service, the information gathered is used for invoicing, issuing passwords, and for the occasional dispatch of information which may help you to make better use of our services. We will respect your email privacy, and no customer or visitor information will be passed on to third parties without your prior consent.</p>
            <p>Your data will be used for strictly professional, commercial and informative terms only. Your data will not be sold, and only shared where you have agreed to do so, as stated in the privacy policy. We only gather the necessary information to contact you to provide legitimate business information.</p>
        </div>
        <HomeFooter />
        </div>
     );
}
 
export default PrivacyPage;