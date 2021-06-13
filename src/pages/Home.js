import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import { Button, Link, Table, Tr, Td, h1} from "@chakra-ui/react"

const Home = () => {
    
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/app'), [history]);

    return (
    <div>
        <Table  size="sm" >
            <Tr>
                <Td><h1>Welcome to Crypto Nomads</h1></Td>
                <Td margin="2px" align="right"><Link to={"/app"}><Button colorScheme="blue" onClick={handleOnClick}>Use CryptoNomads</Button></Link></Td>
            </Tr>
        </Table>
       
        
    </div>)
}
export default Home