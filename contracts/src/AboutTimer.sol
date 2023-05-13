// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/interfaces/IERC20.sol";

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


struct Task {
    address buyer;
    address seller;
    uint256 maxHours;
    uint256 weiPerHour;
    uint256 startTime;
}

/**
@title AboutTimer
@author The It's About Time team
@notice Allows for the creation of timers that will be calculated based on block timestamps for the start and end event
@dev User needs to own bob for interacting with this contract
@dev User needs to setMaxFlowPermissions in bob for this contract
 */
contract AboutTimer {
    event CreatedTask(address indexed buyer, address indexed seller, uint256 actualHours, uint256 weiPerHour);
    event FinalizedTask(address indexed buyer, address indexed seller, uint256 maxHours, uint256 weiPerHour);

    using ECDSA for bytes32;


    IERC20 public bob;


    constructor(IERC20 bob_) {
        bob = bob_;
    }

    mapping(address => Task) public sellerTask;

    // function upsertSellerProfile(address seller, int96 flowRate) external {
    //     sellersFlowrate[seller] = flowRate;
    // }

    // Tasks 2. Create a timer
    function startTimer(address buyer, bytes calldata buyerSignature, uint256 maxHours, uint256 weiPerHour) external {
        require(bob.allowance(buyer, address(this)) >= maxHours * weiPerHour, "Buyer has not enough allowance to cover for maxHours");
        require(bob.balanceOf(buyer) >= maxHours * weiPerHour, "Buyer has not enough balance to cover for maxHours");
        require(sellerTask[msg.sender].buyer == address(0), "Seller already has a task");
        require(verifySignature(buyer, buyerSignature, maxHours, weiPerHour), "Invalid buyer signature");
        sellerTask[msg.sender] = Task(buyer, msg.sender, maxHours, weiPerHour, block.timestamp);
        emit CreatedTask(buyer, msg.sender, maxHours, weiPerHour);
    }

    // Tasks 3. End a timer
    function endTimer() external {
        Task memory task = sellerTask[msg.sender];
        require(task.buyer != address(0), "Seller does not have a task");
        delete sellerTask[msg.sender];
        emit FinalizedTask(task.buyer, msg.sender, block.timestamp - task.startTime, task.weiPerHour);
        bob.transferFrom(task.buyer, msg.sender, (block.timestamp - task.startTime) * task.weiPerHour / 1 hours);
        // end time is block.timestamp
    }

    function verifySignature(
        address signer,
        bytes memory signature,
        uint256 maxHours,
        uint256 weiPerHour
    ) public view returns (bool) {
        // Construct the message
        bytes32 message = keccak256(abi.encodePacked(
            "I agree to order from ",
            msg.sender,
            " for a max of ",
            maxHours,
            " at a rate of ",
            weiPerHour,
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
