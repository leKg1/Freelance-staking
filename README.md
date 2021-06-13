# DeLive (DeLi)

### TODOs
- (GK) deploy on matic 
- (GK) deploy to second blockchain (moonbeam)
- (GK/NK) use 1inch to swap tokens on site https://1inch.io/

### missing functions
- (NK) 1% to parent token   
- (GK) display totalStakes, ourStake in contract list
- (GK)  write invoice in € or $ or BTC or ETC display current value in another currency via chainlink price feed 
- send invoice by email
- show, mark and filter paid and unpaid invoices 

### design
- (NK) fix InvoiceTable (broken)
- (NK/JC) write about DeLive on Landing Page (Write Invoice, Get Paid in crypto, Staking, Dividends, Parent and Child tokens)
- find designer who can quickly fix landing page and app.
- add numbers to landing page. total deployed staking contracts, currently locked value

### smart contracts
#### Staking Token
- (GK) create updatable smart contract
- (GK) add USDT, xDAI and other stable tokens to smart contract (should be able to send)
- (GK) rename FreelanceToken to DeLive DeLi

#### Invoice Token
- (NK) create Invoice SmartContract with invoiceNo, ipfs cid

#### Documentation
- write Documentation