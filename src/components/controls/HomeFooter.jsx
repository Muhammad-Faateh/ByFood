import {Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import React from 'react';
import Logo from '../../images/ByFoodLogo.png';
import {Link} from 'react-router-dom'

const useStyle = makeStyles({
    MenuItems : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        '& ul' : {
            listStyleType : 'none',
        }
    },
    Link : {
        color : 'white',
        textDecoration : 'none',
        '&:hover' : {
            textDecoration : 'underline'
        }
    }
})

const HomeFooter = () => {
    const classes = useStyle();
    return ( 
        <footer
         style={{backgroundColor : '#141414' , marginTop : '1.5rem'}}
         >
            <Grid container spacing={1}>
                <Grid item xs={3} style={{ display : 'flex' , alignItems : 'center' , justifyContent : 'center'}}>
                <img src={Logo} alt="" style={{width : '10rem' , height : '6rem'}} />
                </Grid>
                <Grid item xs={3}/>
                <Grid item xs={3}/>
                <Grid item xs={3}>
                    <div className={classes.MenuItems}>
                        <h1 style={{color : 'white'}}>UseFull Links</h1>
                        <ul>
                            <li>
                                <Link to='/termsandcondition' className = {classes.Link} >Terms and Conditions</Link>
                            </li>
                            <li>
                                <Link to='/privacypolicy' className = {classes.Link}>Privacy policy</Link>
                            </li>
                            <li>
                                <Link to='/faq' className = {classes.Link}>FAQ</Link>
                            </li>
                        </ul>
                    </div>
                </Grid>
                <Grid item xs={12} style={{color : 'white'}}>
                    <p style={{textAlign : 'center' , paddingBottom : '0.5rem'}}>© 2021 Copyright: ByFood.com All Rights Reserved</p>
                </Grid>


            </Grid>
        </footer>
     );
}
 
export default HomeFooter;