import React,  {useState } from 'react';
import { Button, Heading} from "@chakra-ui/react"
import { useMoralis } from 'react-moralis'
import SmartContracts from './components/SmartContracts';
import InvoicesTable from './components/InvoicesTable';
import DeploySmartContract from './components/DeploySmartContract';
import InvoicePage from './components/InvoicePage'
// import SmartContractInfos from './components/SmartContractInfos';
// import Transactions from './components/Transactions'
import {
  useParams
} from "react-router-dom";


function App() {

  const MODE_NEW_CONTRACT = "new_conract"
  const MODE_LIST_CONTRACTS = "list_conrtracts"
  const MODE_EDIT_INVOICES = "edit_invoices"
  const MODE_LIST_INVOICES = "list_invoices"

  const [mode, setMode] = useState(MODE_LIST_CONTRACTS)
  const [invoiceMode, setInvoiceMode] = useState(MODE_LIST_INVOICES)
  const { authenticate, isAuthenticated, isAuthenticating, logout, } = useMoralis();
  const changeMode = (mode) => setMode(mode)
  const changeInvoiceMode = (mode) => setInvoiceMode(mode)

  let { tokenAddress } = useParams()
  const LogoutButton = () => {return  <Button colorScheme="teal" onClick={() => logout()}>Logout</Button>}
  const displayContractList = () => {
    return (
      <div>
        <LogoutButton/>
        <Button colorScheme="purple" onClick={() => changeMode(MODE_NEW_CONTRACT)}>Deploy Token Project</Button>
        {invoiceMode === MODE_LIST_INVOICES && <Button colorScheme="purple" onClick={() => changeInvoiceMode(MODE_EDIT_INVOICES)}>New Invoice</Button>}
        {invoiceMode === MODE_EDIT_INVOICES && <Button colorScheme="purple" onClick={() => changeInvoiceMode(MODE_LIST_INVOICES)}>List Invoices</Button>}
        <p>&nbsp;</p>
        <Heading textAlign="center" color="gray.700">Contracts</Heading> 
        <SmartContracts />
        <p>&nbsp;</p>
        <Heading textAlign="center" color="gray.700">Invoices</Heading>
        <p>&nbsp;</p>
        {invoiceMode === MODE_LIST_INVOICES && <InvoicesTable />}
        {invoiceMode === MODE_EDIT_INVOICES && <InvoicePage />}

      </div>
    )
  }

  const displayNewContract = () => {
    return (
      <div>
          <LogoutButton/>
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
        {mode===MODE_NEW_CONTRACT && displayNewContract()}
        {mode===MODE_LIST_CONTRACTS && displayContractList()}
        {/* <Transactions /> TODO please delete component if not needed */}
        <p>&nbsp;</p>
      </div>
    )
  } else return <Button isLoading={isAuthenticating} onClick={() => authenticate()}>Authenticate</Button>
}

export default App;
