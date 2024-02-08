import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { HashRouter } from 'react-router-dom';

const theme = extendTheme({
  colors: {
    brandPallete: {
      background: "#393E46",
      primary: "#219C90",
      secondary: "#676B7C",
      accent: "#00FFF5",
      text: "#EEEEEE",
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <HashRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </HashRouter>
  </React.StrictMode>,
);
