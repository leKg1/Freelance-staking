import React, {  } from 'react';
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
  import { DeleteIcon } from '@chakra-ui/icons'


const Row = ({
    invoiceNo,
    clientName,
    invoiceDate,
    data
  }) => {
    return (
      <Tr>
        <Td>{invoiceNo}</Td>
        <Td>{clientName}</Td>
        <Td>{invoiceDate}</Td>
        <Td><DeleteIcon onClick={async()=>await data.destroy(invoiceNo)}/></Td>
      </Tr>
    );
  };
  export default Row