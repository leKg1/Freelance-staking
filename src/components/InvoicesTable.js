import React from 'react';
import {
    Table,
    Tbody,
  } from "@chakra-ui/react";
import { useMoralisQuery } from 'react-moralis';
import Head from './Head';
import Row from './Row';

const InvoicesTable = () => {
    const { data } = useMoralisQuery("Invoices")
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