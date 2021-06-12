import React, { useState, useEffect } from 'react';
import {
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  ErrorMessage
} from "@chakra-ui/react";

import Moralis from 'moralis';
import { useMoralis,useNewMoralisObject } from "react-moralis";
import { abi } from "./abi"
import { bytecode } from './bytecode';

const DeploySmartContract = () => {
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenInitialSupply, setTokenInitialSupply] = useState(0)

  const [smartContractAddress, setSmartContractAddress] = useState();

  const { authenticate, isAuthenticated, isAuthenticating, authError, logout, user, isAuthUndefined } = useMoralis();
  const { isSaving, error, save } = useNewMoralisObject('FreelanceToken');

  const registerSmartContract = () => {
        save({smartContractAddress, user})
  }

  const deployFreelanceToken = async () => {
    const web3 = await Moralis.Web3.enable();
    const accounts = await web3.eth.getAccounts();
    const account1 = accounts[0];
    const ourMelalieSmartContract = new web3.eth.Contract(abi);
    try {
        const newContractInstance = await ourMelalieSmartContract
        .deploy({data: bytecode,arguments: [tokenName, tokenSymbol, tokenInitialSupply],})
        .send({from: account1,gas: 4000000,});

        alert("successfully deployed!"); //TODO please beautify with Chakra 
        console.log(newContractInstance.options.address); // instance with the new contract address
      } catch (error) {
        alert(error);
      }
  }

  return (
  <div>
    <Table variant="simple">
      <Tbody>
        <Tr>
          <Td><Input placeholder="Token name" onChange={(e) => {setTokenName(e.target.value);}}/></Td>
          <Td><Input placeholder="Token symbol" onChange={(e) => {setTokenSymbol(e.target.value);}} /></Td>
          <Td><Input placeholder="InitialSupply" onChange={(e) => { setTokenInitialSupply(e.target.value);}}/></Td>
          <Td><Button onClick={deployFreelanceToken}>Deploy new Freelance Staking Token</Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
    <Table variant="simple">
      <Tbody>
        <Tr>
          <td>{error && <ErrorMessage error={error} />}</td><Td><Input placeholder="SmartContract Address" onChange={(e) => {setSmartContractAddress(e.target.value);}}/></Td>
          <Td><Button disabled={isSaving} onClick={registerSmartContract}>Register Freelance Staking Token Contract</Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  </div>
  );
}

  export default DeploySmartContract