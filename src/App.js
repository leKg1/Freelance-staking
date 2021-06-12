import React from 'react';
import {
  Button,
  Heading
} from "@chakra-ui/react"
import { useMoralis } from 'react-moralis'
import SmartContracts from './SmartContracts';
import InvoicesTable from './InvoicesTable';
import DeploySmartContract from './DeploySmartContract';
import SmartContractInfos from './SmartContractInfos';
import Transactions from './Transactions'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";


function App() {
  const { authenticate, isAuthenticated, isAuthenticating, authError, logout, user, isAuthUndefined } = useMoralis();
  let { tokenAddress } = useParams()

  if (isAuthenticated) {
    return (
      <div>
        <Heading textAlign="center" color="gray.700">Welcome to freelance-staking, {user.attributes.username}</Heading>
        <Button onClick={() => logout()}>Logout</Button>
        <p>&nbsp;</p>
        <DeploySmartContract />
        <p>&nbsp;</p>
        <Heading textAlign="center" color="gray.700">Contracts</Heading>
        <p>&nbsp;</p> 
        {/* <Transactions /> TODO please delete component if not needed */}
        <SmartContracts />
        <p>&nbsp;</p>
        <Route path="/:tokenAddress" children={<SmartContractInfos tokenAddress={tokenAddress} />} />
        <p>&nbsp;</p>
        <Heading textAlign="center" color="gray.700">Invoices</Heading>
        <p>&nbsp;</p>
        <InvoicesTable />
      </div>
    )
  } else return <Button isLoading={isAuthenticating} onClick={() => authenticate()}>Authenticate</Button>
}

export default App;
