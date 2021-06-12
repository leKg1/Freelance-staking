import React, { useState, useEffect } from 'react';
import Moralis from 'moralis';
import { useMoralisQuery, useMoralis,useNewMoralisObject } from "react-moralis";
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
  const { fetch, data, isLoading } = useMoralisQuery("FreelanceToken")
  console.log('data',data)
  useEffect(() => {
    const getData = async () => {
      const provider = await detectEthereumProvider();
      const web3 = new Web3(provider)
      if (!provider) {
        console.log('Please install MetaMask!');
        return
      }
      // const options = {
      //   chain: "ropsten",
      //   address: "0x0c9D471976833dC2E910527163DBACf780D30DFF",
      // };
      // const balances = await Moralis.Web3.getAllERC20();

        //query => query.equalTo("invoice.invoiceTitle", invoiceNo), [invoiceNo], {live: true}
     // )
      console.log('data',data)
      const newBalances = []
      for (let index = 0; index < data.length; index++) {
        let contract = Object.create(data[index].attributes);
        const ourFreelanceSmartContract = new web3.eth.Contract(abi, contract.smartContractAddress);
        ourFreelanceSmartContract.methods.name().call().then(name => {
          contract.name = name
          ourFreelanceSmartContract.methods.symbol().call().then(symbol => {
            contract.symbol = symbol
            ourFreelanceSmartContract.methods.totalSupply().call().then(totalSupply => {
              contract.totalSupply = totalSupply
              web3.eth.getBalance(contract.smartContractAddress).then(balance => {
                contract.tokenBalance = balance
                newBalances.push(contract)
                setSmartContractList(newBalances)
              })
            })
          })
        })
      }
    }
    getData()
  }, []);

  console.log('generating smartcontractlist', smartContractList)
  const list2 = smartContractList.map((contract, i) => {
    return (
      <Tr key={i}>
        <Td>{contract.name}</Td>
        <Td>{contract.symbol}</Td>
        <Td><Link to={"/" + contract.smartContractAddress}>{contract.smartContractAddress}</Link></Td>
        <Td>{contract.tokenBalance} {contract.symbol}</Td>
        <Td>{contract.totalSupply}</Td>
      </Tr>
    )
  })
  console.log('rerendering')

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Symbol</Th>
          <Th>TokenAddress</Th>
          <Th>Balance</Th>
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