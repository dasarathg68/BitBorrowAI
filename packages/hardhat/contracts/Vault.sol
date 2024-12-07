// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IBitcoinLightClient {
    function verifyInclusion(bytes calldata transaction, bytes calldata proof) external returns (bool);
}

contract Vault {
    IBitcoinLightClient public bitcoinLightClient;
    mapping(address => uint256) public collateralBalances;
    mapping(address => uint256) public stablecoinBalances;
    uint256 public collateralizationRatio = 150;

    event Deposit(address indexed user, uint256 amount);
    event MintStablecoin(address indexed user, uint256 amount);

    constructor(address _bitcoinLightClient) {
        bitcoinLightClient = IBitcoinLightClient(_bitcoinLightClient);
    }

    function depositCollateral(bytes calldata transaction, bytes calldata proof) external payable {
        require(bitcoinLightClient.verifyInclusion(transaction, proof), "Invalid Bitcoin transaction");
        collateralBalances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function mintStablecoins(uint256 amount) external {
        uint256 requiredCollateral = (amount * collateralizationRatio) / 100;
        require(collateralBalances[msg.sender] >= requiredCollateral, "Insufficient collateral");
        stablecoinBalances[msg.sender] += amount;
        emit MintStablecoin(msg.sender, amount);
    }
}
