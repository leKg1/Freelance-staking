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
    Button
  } from "@chakra-ui/react";
import Moralis from 'moralis';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const SmartContracts =  () => {
  const [smartContract, setSmartContract] = useState([]);
  const options = {
    chain: "ropsten",
    address: "0x0c9D471976833dC2E910527163DBACf780D30DFF",
  };

  useEffect(async () => {
    const balances = await Moralis.Web3.getAllERC20(options);
    console.log("balances", balances);
    setSmartContract(balances);
  }, []);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>balance</Th>
          <Th>contractType</Th>
          <Th>decimals</Th>
          <Th>name</Th>
          <Th>symbol</Th>
          <Th>tokenAddress</Th>
        </Tr>
      </Thead>
      <Tbody>
        {smartContract.map((contract, i) => (
          <Tr key={i}>
            <Td isNumeric>{contract.balance}</Td>
            <Td>{contract.contractType}</Td>
            <Td isNumeric>{contract.decimals}</Td>
            <Td>{contract.name}</Td>
            <Td>{contract.symbol}</Td>
            <Td><Link to={"/"+contract.tokenAddress}>{contract.tokenAddress}</Link></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
export default SmartContracts