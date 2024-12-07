// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Stablecoin is ERC20 {
    address public vault;

    modifier onlyVault() {
        require(msg.sender == vault, "Only vault can mint or burn");
        _;
    }

    constructor() ERC20("Bitcoin-backed Stablecoin", "BTCUSD") {
    }
    function setVault(address _vault) external {
        vault = _vault;
    }

    function mint(address to, uint256 amount) external onlyVault {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyVault {
        _burn(from, amount);
    }
}
