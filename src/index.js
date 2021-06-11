import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { MoralisProvider } from 'react-moralis';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const appId = "LIH9AUHhgxHJL1znD3sihvs4FYHUg1LRmQKF0Inb"
const serverUrl = "https://m0tqpnkafcwt.moralis.io:2053/server"

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
            <Route exact path="/" children={<App />} />
            <Route path="/:tokenAddress" children={<App />} />
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
