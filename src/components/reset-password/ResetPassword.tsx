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
import { InputAdornment} from '@mui/material';
import styles from './VisibilityIcon.module.css';
import { apiResetPassword } from '../../remote/e-commerce-api/authService';

export default function ResetPassword(){

    const navigate = useNavigate();
    
    const {id} = useParams();

    const [error, setError] = useState({
      errorMessage:'',
  })

    const[showErrorIcon, setShowErrorIcon]  = React.useState(false);
    const[visibleIcon1,setVisibleIcon1] = React.useState(true);
    const[visibleIcon2,setVisibleIcon2] = React.useState(true);  

    /**
     * Checks for an input error
     * @param password {string} -first password input field
     * @param passwordVerify {string} - Second password input field
     * @returns {boolean} - true if there is an input error, false if not.
     */
    function checkInputError (password:string, passwordVerify:string):boolean { 
      let error = false; 
      //first check if the two fields are the same 
      if(password !== passwordVerify){
          setError(state=>({...state, errorMessage: 'Please make sure that both passwords match.'}));
          error = true;
      } else {
        //Now that we know they are both the same, now check if password meets requirements
        error = checkValidPass(password);
      }
      //show error icon if there is an error (if there is an error, the error message will be displayed as well)
      setShowErrorIcon(error);
      return error;
    }

    /**
     * Checks if the password is valid and contains at least 8 characters, an uppercase, lowercase, number and special character
     * @param password {string} - takes in a password to check 
     * @returns {boolean} - true if there is an input error, false if not
     * 
     */
    
    function checkValidPass(password:string):boolean{
      const rege = new RegExp(".*[A-Z].*[a-z].*[0-9].*[!@#$%^&*()_+].*");
      const error = !rege.exec(password);
      if(error){
        setError(state=>({...state, errorMessage: 'Password must be at least 8 characters containing at least an uppercase, a lowercase, and one of the following special characters: !@#$%^&*()_+].*'}));
      }else{
        setError(state=>({...state, errorMessage: ''}));
      }
      return error;
    } 

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        //check if the two password inputs are the same before submitting
        if(!checkInputError(`${data.get('password')}`, `${data.get('passwordVerify')}`)){
          const response = await apiResetPassword(parseInt(id!),`${data.get('password')}`);
          if(response.status === 205){
            setError(state=>({...state, errorMessage: 'Your password reset link has expired. Password reset links last 24 hours. Please request a new one.'}));
            setShowErrorIcon(true);
          } else if(response.status >= 200 && response.status < 300){
            console.log(response);
            setError(state=>({...state, errorMessage: ''}));
            setShowErrorIcon(false);
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
              <Avatar sx={{ m: 1,  bgcolor: '#F26925' }}>
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
                  {showErrorIcon ? <ErrorOutlineOutlinedIcon color ='error' fontSize = 'inherit'/> :null} {error.errorMessage}
                </FormHelperText>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2,  bgcolor: '#72A4C2' }}
                >
                  Reset Password
                </Button>
              </Box>
            </Box>
          </Container>
      );
}