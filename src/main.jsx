import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import CustomApp from './components/custom/CustomApp';
import { ModeProvider } from './contexts/ModeContext';
import { RefProvider } from './contexts/RefContext';
const theme = createTheme({
  palette: {
    secondary: {
      main: '#c4daef'
    }
  }
});
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <ModeProvider>
      <RefProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/customApp" element={<CustomApp />} />
          </Routes>
        </BrowserRouter>
      </RefProvider>
    </ModeProvider>
  </ThemeProvider>
  // </React.StrictMode>
);
