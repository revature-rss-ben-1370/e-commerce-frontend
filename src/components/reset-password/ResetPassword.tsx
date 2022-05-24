import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment} from '@material-ui/core';
import styles from './VisibilityIcon.module.css';
import { apiResetPassword } from '../../remote/e-commerce-api/authService';

export default function ResetPassword(){

    const navigate = useNavigate();
    
    const {id} = useParams();

    const [inputErrors, setInputErrors] = useState({
        misMatch:'',
    })

    const[showErrorIcon, setShowErrorIcon] = React.useState(false);
    const[visibleIcon1,setVisibleIcon1] = React.useState(true);
    const[visibleIcon2,setVisibleIcon2] = React.useState(true);  

    /**
     * Checks two password input fields for a mismatch 
     * @param password {string} -first password input field
     * @param passwordVerify {string} - Second password input field
     * @returns {boolean} - true if the two passwords are mismatched, false if they are the same.
     */
    function checkMismatch (password:string, passwordVerify:string):boolean { 
        let error = false; 
        if(password !== passwordVerify){
            setInputErrors(state=>({...state, misMatch: 'Please make sure that both passwords match.'}));
            setShowErrorIcon(true);
            error = true;
        } else{
          //clear errors if the two passwords are the same
          setInputErrors(state=>({...state, misMatch: ''}));
          setShowErrorIcon(false);
          error = false;
        }
        return error;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //check if the two password inputs are the same before submitting
        if(!checkMismatch(`${data.get('password')}`, `${data.get('passwordVerify')}`)){
          const response = await apiResetPassword(parseInt(id!),`${data.get('password')}`);
          console.log(response.payload);
          if(response.status >= 200 && response.status < 300){
            navigate('/reset-password-success');
          }
        }
    };

    return (
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Reset Your Password
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Enter new password"
                  type={visibleIcon1? 'password' : 'text'}
                  id="password"
                  InputProps={{
                    endAdornment: (
                      visibleIcon1?
                      <InputAdornment position="end" >
                        <VisibilityIcon className={styles.eye} onClick={()=> setVisibleIcon1(!visibleIcon1)}/>
                      </InputAdornment>:
                      <InputAdornment position="end">
                        <VisibilityOffIcon className={styles.eye} onClick={()=> setVisibleIcon1(!visibleIcon1)}/>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="passwordVerify"
                  label="Confirm new password"
                  type={visibleIcon2? 'password' : 'text'}
                  id="password"
                  InputProps={{
                    endAdornment: (
                      visibleIcon2?
                    <InputAdornment position="end">
                      <VisibilityIcon className={styles.eye} onClick={()=> setVisibleIcon2(!visibleIcon2)}/>
                    </InputAdornment>:
                    <InputAdornment position="end">
                      <VisibilityOffIcon className={styles.eye} onClick={()=> setVisibleIcon2(!visibleIcon2)}/>
                    </InputAdornment>
                    )
                  }}
                />
                <FormHelperText error>
                  {showErrorIcon ? <ErrorOutlineOutlinedIcon color ='error' fontSize = 'inherit'/> :null} {inputErrors.misMatch}
                </FormHelperText>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset Password
                </Button>
              </Box>
            </Box>
          </Container>
      );
}