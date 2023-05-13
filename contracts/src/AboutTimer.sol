// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {
    ISuperfluid, 
    ISuperToken, 
    ISuperApp
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { SuperTokenV1Library } from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


struct Task {
    address buyer;
    address seller;
    int96 flowRate;
}

/**
@title AboutTimer
@author The It's About Time team
@notice Allows for the creation of timers that will be calculated based on block timestamps for the start and end event
@dev User needs to own BOBx for interacting with this contract
@dev User needs to setMaxFlowPermissions in BOBx for this contract
 */
contract AboutTimer {
    event CreatedTask(address indexed buyer, address indexed seller, int96 flowRate);
    event FinalizedTask(address indexed buyer, address indexed seller, int96 flowRate);

    /// @notice CFA Library.
    using SuperTokenV1Library for ISuperToken;
    using ECDSA for bytes32;


    ISuperToken public BOBx;


    constructor(ISuperToken BOBx_) {
        BOBx = BOBx_;
    }

    mapping(address => Task) public sellerTask;

    // function upsertSellerProfile(address seller, int96 flowRate) external {
    //     sellersFlowrate[seller] = flowRate;
    // }

    // Tasks 2. Create a timer
    function startTimer(address buyer, bytes calldata buyerSignature, int96 flowRate) external {
        // verify buyer signature for message 'I agree to order ${orderId} from ${msg.sender} for ${flowRate} and acknolewdge I have read the terms and conditions of It's About Time!'
        require(sellerTask[msg.sender].buyer == address(0), "Seller already has a task");
        require(verifySignature(buyer, flowRate, buyerSignature), "Invalid buyer signature");
        sellerTask[msg.sender] = Task(buyer, msg.sender, flowRate);
        emit CreatedTask(buyer, msg.sender, flowRate);
        BOBx.createFlowFrom(buyer, msg.sender, flowRate);
    }

    // Tasks 3. End a timer
    function endTimer() external {
        Task memory task = sellerTask[msg.sender];
        require(task.buyer != address(0), "Seller does not have a task");
        delete sellerTask[msg.sender];
        emit FinalizedTask(task.buyer, msg.sender, task.flowRate);
        // end time is block.timestamp
        BOBx.deleteFlow(task.buyer, msg.sender);
    }

    function verifySignature(
        address signer,
        int96 flowRate,
        bytes memory signature
    ) public view returns (bool) {
        // Construct the message
        bytes32 message = keccak256(abi.encodePacked(
            "I agree to order from ",
            msg.sender,
            " for ",
            flowRate,
            " and acknowledge I have read the terms and conditions of It's About Time!"
        ));

        // Create the prefixed hash
        bytes32 prefixedHash = message.toEthSignedMessageHash();

        // Recover the address from the signature
        address recoveredAddress = prefixedHash.recover(signature);

        // Compare the recovered address with the signer's address
        return (recoveredAddress == signer);
    }
}
