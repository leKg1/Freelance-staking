const BigNumber = require('bignumber.js');
const FreelanceToken = artifacts.require('./FreelanceToken.sol');

module.exports = function(deployer, network, accounts) {
    deployer.deploy(FreelanceToken,
        "FreelanceToken",
        "FREE",
        new BigNumber(10).pow(18).multipliedBy(1000000)//1000000000000000000000000
    )
}