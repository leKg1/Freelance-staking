import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Landing from './pages/Landing';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { MoralisProvider } from 'react-moralis';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const appId = "sJH8z1skIkqg5FiQaETHjsUryA8aeT47b1DK0R5a"
const serverUrl = "https://2zcf5kqjhrv2.moralis.io:2053/server"

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
})

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <ChakraProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" children={<Landing />} />
            <Route path="/app" children={<App />} />
            <Route path="/app/:tokenAddress" children={<App />} />
          </Switch>
        </Router>
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
