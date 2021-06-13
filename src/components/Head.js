import React from 'react';
import {
    Thead,
    Tr,
    Th,
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