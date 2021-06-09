import React from 'react';
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

const Head = () => {
    return (
      <Thead>
        <Tr>
          <Th>Invoice No</Th>
          <Th>ClientName</Th>
          <Th>InvoiceDate</Th>
        </Tr>
      </Thead>
    );
  };
  export default Head