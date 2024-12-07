// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IStablecoin {
    function mint(address to, uint256 amount) external;
    function burn(address from, uint256 amount) external;
}

contract Lending {
    IStablecoin public stablecoin;
    uint256 public collateralizationRatio = 150;

    struct Loan {
        uint256 amount;
        uint256 collateral;
    }

    mapping(address => Loan) public loans;

    constructor(address stablecoinAddress) {
        stablecoin = IStablecoin(stablecoinAddress);
    }

    function borrow(uint256 amount, uint256 collateral) external payable {
        require(msg.value == collateral, "Collateral mismatch");
        require((collateral * 100) / amount >= collateralizationRatio, "Under-collateralized");
        loans[msg.sender] = Loan(amount, collateral);
        stablecoin.mint(msg.sender, amount);
    }

    function repay() external {
        Loan storage loan = loans[msg.sender];
        require(loan.amount > 0, "No active loan");
        stablecoin.burn(msg.sender, loan.amount);
        payable(msg.sender).transfer(loan.collateral);
        delete loans[msg.sender];
    }
}
