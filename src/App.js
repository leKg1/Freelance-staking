import React,  {useEffect,useState } from 'react';
import { Button, Heading} from "@chakra-ui/react"
import { useMoralis } from 'react-moralis'
import SmartContracts from './components/SmartContracts';
import InvoicesTable from './components/InvoicesTable';
import DeploySmartContract from './components/DeploySmartContract';
// import SmartContractInfos from './components/SmartContractInfos';
// import Transactions from './components/Transactions'
import {
  useParams
} from "react-router-dom";


function App() {

  const MODE_NEW_CONTRACT = "new_conract"
  const MODE_LIST_CONTRACTS = "list_conrtracts"

  const [mode, setMode] = useState(MODE_LIST_CONTRACTS);
  const { authenticate, isAuthenticated, isAuthenticating, logout, } = useMoralis();
  const changeMode = (mode) => setMode(mode)

  let { tokenAddress } = useParams()

  const displayContractList = () => {
    return (
      <div>
        <Button colorScheme="purple" onClick={() => changeMode(MODE_NEW_CONTRACT)}>New Token Project</Button>
        <p>&nbsp;</p>
        <Heading textAlign="center" color="gray.700">Contracts</Heading> 
        <SmartContracts />
        <p>&nbsp;</p>
        <Heading textAlign="center" color="gray.700">Invoices</Heading>
        <p>&nbsp;</p>
        <InvoicesTable />
      </div>
    )
  }

  const displayNewContract = () => {
    return (
      <div>
        <Button colorScheme="purple" onClick={() => changeMode(MODE_LIST_CONTRACTS)}>My Token Projects</Button>
        <p>&nbsp;</p>
        <Heading textAlign="center" color="gray.700">Deploy New Staking Token</Heading> 
        <DeploySmartContract />
    </div>
    )

}

  if (isAuthenticated) {
    return (
      <div>
        <Heading textAlign="center" color="gray.700">Welcome to DeLive (DeLi)</Heading>
        <Button colorScheme="teal" onClick={() => logout()}>Logout</Button>
      
        {mode===MODE_NEW_CONTRACT && displayNewContract()}
        {mode===MODE_LIST_CONTRACTS && displayContractList()}
       
 

        {/* <Transactions /> TODO please delete component if not needed */}

        <p>&nbsp;</p>

      </div>
    )
  } else return <Button isLoading={isAuthenticating} onClick={() => authenticate()}>Authenticate</Button>
}

export default App;
