import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from '../reset-password/SuccessBox.module.css'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Link from '@mui/material/Link';
import FormHelperText from '@mui/material/FormHelperText';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function CheckEmailNotification(){

    const {state}:any = useLocation();
    const email= state['email'] as any;

    return(  
        <Container component="main" maxWidth="xs">
        <Box className={styles.SuccessBox}
            sx={{
            border: '1px solid #72A4C2',
            borderRadius:3,
            p:3,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <div className={styles.successCheckMark}>
                <MarkEmailReadIcon fontSize='inherit'/>
            </div>
            <Box>
            <Typography component="h1" variant="h5" align="center">
                    {email}
            </Typography>
            <div className={styles.successTextBox}>
                <br />
                    You will receive instructions to reset your password if the email address you entered is registered.
                <br />
            </div>
            <Button
                href="/"      
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#72A4C2' }}
            >
            Ok
            </Button>
            <FormHelperText>
                <Typography align="center" variant='body2'>
                    Didn't get the email? If it doesn't arrive soon, check your spam folder or&nbsp;
                    <Link href="/forgot-password" color="#72A4C2" underline="hover">
                        {"send the email again."}
                    </Link>
                </Typography>
            </FormHelperText>
            </Box>
        </Box>
    </Container>
    );
}