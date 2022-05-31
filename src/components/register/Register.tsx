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
import { apiRegister } from '../../remote/e-commerce-api/authService';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment } from '@material-ui/core';
import styles from '../reset-password/VisibilityIcon.module.css';
import {
  Snackbar,
  IconButton
} from "@material-ui/core";
import {
  Close
} from "@material-ui/icons";

export default function Register() {
  const navigate = useNavigate();
  const ErrorAlert = Snackbar;

  const defaultFirstNameHelper = "Please enter a valid first name.";
  const defaultLastNameHelper = "Please enter a valid last name.";
  const defaultPasswordHelper = "Please enter a password containing at least 8 characters containing at least: an UPPERCASE, lowercase, number and special character.";

  const [visibleIcon1, setVisibleIcon1] = React.useState(true);

  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameHelper, setFirstNameHelper] = React.useState<String>("");

  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameHelper, setLastNameHelper] = React.useState<String>("");

  const [emailError, setEmailError] = React.useState(false);
  const [emailHelper, setEmailHelper] = React.useState<String>("");

  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordHelper, setPasswordHelper] = React.useState<String>(defaultPasswordHelper);

  //UseState results in comparison being 1 character behind
  //UseRef default not working as expected. Use HTMLInputElement reference
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const passwordDupeRef = React.useRef<HTMLInputElement>(null);

  const [passwordDupeError, setPasswordDupeError] = React.useState(false);
  const [passwordDupeHelper, setPasswordDupeHelper] = React.useState<String>("");

  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (emailError || passwordError || firstNameError || lastNameError || passwordDupeError) return;

    const firstName: String = data.get('firstName')?.valueOf() as String;
    const lastName: String = data.get('lastName')?.valueOf() as String;
    const email: String = data.get('email')?.valueOf() as String;
    const password: String = data.get('password')?.valueOf() as String;

    if (firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0) return;

    const response = await apiRegister(`${firstName}`, `${lastName}`, `${email.toLowerCase()}`, `${password}`)

    if (response.status >= 200 && response.status < 300) {
      navigate('/login');
      return;
    }

    if (response.status >= 400) {
      setErrorAlertMessage("Unable to register you at this time. \nEmail may already be taken.");
      setShowErrorAlert(true);
      return;
    }
  };

  const checkPassMatch = () => {
    if (passwordRef.current?.value !== passwordDupeRef.current?.value) {
      setPasswordDupeError(true);
      setPasswordDupeHelper("Passwords do not match");
      return;
    }
    setPasswordDupeError(false);
    setPasswordDupeHelper("");
  }

  const checkPassDupe = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    checkPassMatch();
  }

  const checkValidFirstName = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.currentTarget.value == null || event.currentTarget.value.trim().length === 0) {
      setFirstNameError(true);
      setFirstNameHelper(defaultFirstNameHelper);
      return;
    }

    if (event.currentTarget.value.length !== event.currentTarget.value.trim().length) {
      setFirstNameError(true);
      setFirstNameHelper("Invalid space at beginning or end of first name");
      return;
    }

    setFirstNameError(false);
    setFirstNameHelper("");
  };

  const checkValidLastName = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.currentTarget.value == null || event.currentTarget.value.trim().length === 0) {
      setLastNameError(true);
      setLastNameHelper(defaultLastNameHelper);
      return;
    }

    if (event.currentTarget.value.length !== event.currentTarget.value.trim().length) {
      setLastNameError(true);
      setLastNameHelper("Invalid space at beginning or end of last name");
      return;
    }

    setLastNameError(false);
    setLastNameHelper("");
  };

  const checkValidEmail = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rege = new RegExp(".*@.*\\..*");
    const text = event.currentTarget.value;

    if (!rege.exec(text) && text.length !== 0) {
      setEmailError(true);
      return;
    }
    setEmailHelper("");
    setEmailError(false);
  };

  const checkValidPass = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = event.currentTarget.value;
    checkPassMatch();
    if (text.length === 0) {
      setPasswordError(false);
      setPasswordHelper(defaultPasswordHelper);
      return;
    }

    const lowerRegex = new RegExp("(?=.*[a-z])");
    const upperRegex = new RegExp("(?=.*[A-Z])");
    const numRegex = new RegExp("(?=.*\\d)");
    const specialRegex = new RegExp("(?=.*[@$!%*?&])");

    let newHelper: String = "Missing:\n";
    let anyErrors: boolean = false;
    if (!lowerRegex.exec(text)) {
      anyErrors = true;
      newHelper += "\tlowercase\n,";
    }
    if (!upperRegex.exec(text)) {
      anyErrors = true;
      newHelper += "\tUPPERCASE\n,";
    }
    if (!numRegex.exec(text)) {
      anyErrors = true;
      newHelper += "\tnumbers\n,";
    }
    if (!specialRegex.exec(text)) {
      anyErrors = true;
      newHelper += "\tspecial characters such as @$!%*?&\n,";
    }
    if (text.length < 8) {
      anyErrors = true;
      newHelper += "\tat least 8 characters";
    }
    else {
      newHelper = newHelper.substring(0, newHelper.length - 1);
    }
    if (anyErrors) {
      setPasswordHelper(newHelper);
      setPasswordError(true);
      return;
    }

    setPasswordHelper("");
    setPasswordError(false);
  };

  function hideErrorAlert() {
    setShowErrorAlert(false)
  }

  const alertCloseAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={hideErrorAlert}
    >
      <Close fontSize="small" />
    </IconButton>
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#F26925' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={checkValidFirstName}
                error={firstNameError}
                helperText={firstNameHelper}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={checkValidLastName}
                error={lastNameError}
                helperText={lastNameHelper}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                onChange={checkValidEmail}
                error={emailError}
                helperText={emailHelper}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={visibleIcon1 ? 'password' : 'text'}
                id="password"
                autoComplete="new-password"
                inputRef={passwordRef}
                onChange={checkValidPass}
                error={passwordError}
                helperText={passwordHelper}
                InputProps={{
                  endAdornment: (
                    visibleIcon1 ?
                      <InputAdornment position="end" >
                        <VisibilityIcon className={styles.eye} onClick={() => setVisibleIcon1(!visibleIcon1)} />
                      </InputAdornment> :
                      <InputAdornment position="end">
                        <VisibilityOffIcon className={styles.eye} onClick={() => setVisibleIcon1(!visibleIcon1)} />
                      </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordDupe"
                label="Confirm Password"
                type="password"
                id="passwordDupe"
                autoComplete="new-password"
                inputRef={passwordDupeRef}
                onChange={checkPassDupe}
                error={passwordDupeError}
                helperText={passwordDupeHelper}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#72A4C2' }}
          >
            Sign Up!
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="login" variant="body2" color="#72A4C2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ErrorAlert
        style={{ height: "100%" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}

        open={showErrorAlert}
        autoHideDuration={6000}
        onClose={hideErrorAlert}
        message={errorAlertMessage}
        action={alertCloseAction}
      />
    </Container>
  );
}
