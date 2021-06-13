import Moralis from 'moralis';
import { useEffect,useState } from 'react';

const Transactions = () => {

    const [transactions, setTransactions] = useState()

    const getTransactions = async () => {
        // get BSC transactions for a given address
        // with most recent transactions appearing first
        const options = { chain: "bsc", address: "0x...", order: "desc" };
        const transactions = await Moralis.Web3.getTransactions(options);
        setTransactions(transactions)

        const user = Moralis.User.current();

        const query = new Moralis.Query("EthTransactions");
        query.equalTo("from_address", user.get("ethAddress"));
        const results = await query.find();

        results.forEach(element => {
            console.log(element.attributes)
        });
        //console.log('results',  Web3.utils.toAscii(results[0].attributes.input))
    }

    useEffect(() => {
            getTransactions()
            console.log('transactions',transactions)
    }, []);
    console.log('rendering Transactions')

    return (<div>Transactions</div>)
}
export default Transactions