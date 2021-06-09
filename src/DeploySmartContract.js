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
  import { abi } from "./abi"
  import { bytecode } from './bytecode';

const DeploySmartContract = () => {
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenInitialSupply, setTokenInitialSupply] = useState(0)

  const deploy = async () => {
  const web3 = await Moralis.Web3.enable();
  const accounts = await web3.eth.getAccounts();
  const account1 = accounts[0];
  const ourMelalieSmartContract = new web3.eth.Contract(abi);
  try {
    const newContractInstance = await ourMelalieSmartContract
      .deploy({
        data: bytecode,
        arguments: [tokenName, tokenSymbol, tokenInitialSupply],
      })
      .send({
        from: account1,
        gas: 4000000,
      });
    alert("successfully deployed!");
    console.log(newContractInstance.options.address); // instance with the new contract address
  } catch (error) {
    alert(error);
  }
  }

  return (
    <Table variant="simple">
      <Tbody>
        <Tr>
          <Td>
            <Input
              placeholder="Token name"
              onChange={(e) => {
                setTokenName(e.target.value);
              }}
            ></Input>
          </Td>
          <Td>
            <Input
              placeholder="Token symbol"
              onChange={(e) => {
                setTokenSymbol(e.target.value);
              }}
            ></Input>
          </Td>
          <Td>
            <Input
              placeholder="InitialSupply"
              onChange={(e) => {
                setTokenInitialSupply(e.target.value);
              }}
            ></Input>
          </Td>
          <Td>
            <Button onClick={deploy}>
              Deploy your contract
            </Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
}

  export default DeploySmartContract