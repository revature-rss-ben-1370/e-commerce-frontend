import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { apiLogin } from '../../remote/e-commerce-api/authService';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment} from "@mui/material";
import styles from '../reset-password/VisibilityIcon.module.css';

export default function Login() {
  const navigate = useNavigate();

  const[visibleIcon1,setVisibleIcon1] = React.useState(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await apiLogin(`${data.get('email')}`, `${data.get('password')}`);
    if (response.status >= 200 && response.status < 300) navigate('/')
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1,  bgcolor: '#F26925' }}>
          < LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={visibleIcon1? 'password' : 'text'}
            id="password"
            autoComplete="current-password"
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
          <Grid container>
            <Grid item>
              <Link href="/forgot-password" variant="body2" color="#72A4C2" style={{ textDecoration: 'none' }}>
                {"Forgot your password?"}
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2,  bgcolor: '#72A4C2' }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="register" variant="body2" color="#72A4C2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
