import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/nunito';
import { CssBaseline } from '@mui/material';
import App from './App.jsx';
import { AuthProvider } from './helpers/authContext.jsx';

const theme = createTheme({
  input: {
    color: 'white',
  },
  typography: {
    fontFamily: 'Nunito',
  },
  palette: {
    primary: {
      main: '#2E2E2E',
      light: '#839A82',
      text: '#FFF',
    },
    secondary: {
      main: '#3E3D3D',
      light: '#5C6C5A',
      dark: '#000',
    },
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 460,
      md: 720,
      lg: 1280,
      xl: 1800,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
