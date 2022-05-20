import React from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import styled from "styled-components";
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function DarkModeSwitcher(){
  const mode = sessionStorage.getItem('colorMode');

  //Switches color modes, and stores the value so the change is persistent.
  function changeMode() {
    sessionStorage.setItem('colorMode', mode != 'lightMode' ? 'lightMode' : 'darkMode');
    window.location.reload();
  }

  const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

  return(
    <Right>
        <Button
          color='primary'
          variant='contained'
          sx={{ mt: 0.30, mb: 0 }}
          onClick={() => changeMode()}>

          {mode != 'lightMode' ? 'dark mode' : 'light mode'}
        </Button>
    </Right>
  );
}
