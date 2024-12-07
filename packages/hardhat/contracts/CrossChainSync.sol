// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IHyperlaneInbox {
    function dispatch(uint32 destinationDomain, bytes32 recipient, bytes calldata message) external;
}

interface IHyperlaneOutbox {
    function handle(uint32 originDomain, bytes32 sender, bytes calldata message) external;
}

contract CrossChainSync {
    IHyperlaneInbox public inbox;
    IHyperlaneOutbox public outbox;

    constructor(address _inbox, address _outbox) {
        inbox = IHyperlaneInbox(_inbox);
        outbox = IHyperlaneOutbox(_outbox);
    }

    function sendBalanceUpdate(uint32 destinationDomain, bytes32 recipient, uint256 balance) external {
        bytes memory message = abi.encode(balance);
        inbox.dispatch(destinationDomain, recipient, message);
    }
}
