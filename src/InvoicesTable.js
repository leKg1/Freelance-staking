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
import { useMoralis, useNewMoralisObject, useMoralisQuery } from 'react-moralis';
import Head from './Head';
import Row from './Row';

const InvoicesTable = () => {
    const { fetch, data, isLoading } = useMoralisQuery("Invoices")
    return (
      <div><Table variant="simple">
        <Head />
        <Tbody>
          {data.map((d) => (
            <Row
              key={d.attributes.invoice.invoiceTitle}
              data={d}
              invoiceNo={d.attributes.invoice.invoiceTitle}
              clientName={d.attributes.invoice.clientName}
              invoiceDate={d.attributes.invoice.invoiceDate}
            />
          ))}
        </Tbody>
      </Table></div>
    );
  };

  export default InvoicesTable