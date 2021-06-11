import React, { useState, useEffect } from 'react';
import Moralis from 'moralis';
import Web3 from "web3"
import detectEthereumProvider from '@metamask/detect-provider';

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
    Button
  } from "@chakra-ui/react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { abi } from "./abi"


const SmartContracts =  () => {

  const [smartContractList, setSmartContractList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const provider = await detectEthereumProvider();
      const web3 = new Web3(provider)
      if (!provider) {
        console.log('Please install MetaMask!');
        return
      }
      const options = {
        chain: "ropsten",
        address: "0x0c9D471976833dC2E910527163DBACf780D30DFF",
      };
      const balances = await Moralis.Web3.getAllERC20(options);
      const newBalances = []
      balances.forEach(async (contract, i) => {
        if (contract.tokenAddress !== undefined) {
          // console.log('contract.tokenAddress',contract.tokenAddress)
          const ourFreelanceSmartContract = new web3.eth.Contract(abi, contract.tokenAddress);
          // console.log('ourFreelanceSmartContract',ourFreelanceSmartContract)
          //await ourFreelanceSmartContract.methods.name().call()
          balances[i].name = await ourFreelanceSmartContract.methods.name().call()
          balances[i].symbol = await ourFreelanceSmartContract.methods.symbol().call()
          balances[i].totalSupply = await ourFreelanceSmartContract.methods.totalSupply().call()
          balances[i].tokenBalance = await web3.utils.fromWei(contract.balance, "ether") + " " + contract.symbol
          newBalances.push(balances[i])
        }
      })
      console.log('foreach balances finished, channging local state now')
      setSmartContractList(newBalances)
    }
    getData()
  }, []);

  console.log('generating smartcontractlist', smartContractList)
  const list2 = smartContractList.map((contract, i) => {
    return (
      <Tr key={i}>
        <Td><Link to={"/" + contract.tokenAddress}>{contract.tokenAddress}</Link></Td>
        <Td>{contract.tokenBalance}</Td>
        <Td>{contract.contractType}</Td>
        <Td>{contract.name}</Td>
        <Td>{contract.symbol}</Td>
        <Td>{contract.totalSupply}</Td>
      </Tr>
    )
  })
  console.log('rerendering')

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>TokenAddress</Th>
          <Th>Balance</Th>
          <Th>ContractType</Th>
          <Th>Name</Th>
          <Th>Symbol</Th>
          <Th>TotalSupply</Th>
        </Tr>
      </Thead>
      <Tbody>
        {list2}
      </Tbody>
    </Table>
  )
}
export default SmartContracts