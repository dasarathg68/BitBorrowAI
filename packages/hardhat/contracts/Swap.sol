// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AtomicSwap {
    struct Swap {
        address initiator;
        uint256 amount;
        bytes32 hashLock;
        uint256 timeout;
    }

    mapping(bytes32 => Swap) public swaps;

    function initiateSwap(bytes32 hashLock, uint256 timeout) external payable {
        require(swaps[hashLock].initiator == address(0), "Swap already exists");
        swaps[hashLock] = Swap(msg.sender, msg.value, hashLock, block.timestamp + timeout);
    }

    function redeemSwap(bytes32 secret) external {
        bytes32 hashLock = keccak256(abi.encodePacked(secret));
        Swap memory swap = swaps[hashLock];
        require(swap.initiator != address(0), "Swap not found");
        require(block.timestamp <= swap.timeout, "Swap expired");
        delete swaps[hashLock];
        payable(msg.sender).transfer(swap.amount);
    }
}
