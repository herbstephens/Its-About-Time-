// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


import {AboutTimer} from '../src/AboutTimer.sol';
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";


contract AboutTimerTest is Test {
    AboutTimer aboutTimer;
    ERC20Mock bob;
    uint256 constant BUYER_PK = 1;
    address buyer;
    address constant SELLER = address(123);

    using ECDSA for bytes32;


    function setUp() public {
        buyer = vm.addr(BUYER_PK);
        bob = new ERC20Mock("Bob", "BOB", buyer, type(uint256).max);
        aboutTimer = new AboutTimer(IERC20(bob));
    }

    function testEndTimerRevertsWithNoTask() public {
        vm.expectRevert("Seller does not have a task");
        aboutTimer.endTimer();
    }
    
    function testEndTimer() public {
        uint256 maxHours = 1;
        uint256 weiPerHour = 1 ether;
        vm.startPrank(buyer);
        bob.approve(address(aboutTimer), maxHours * weiPerHour);
        vm.stopPrank();
        vm.startPrank(SELLER);
        aboutTimer.startTimer(buyer, _signMessage(SELLER, maxHours, weiPerHour, BUYER_PK), maxHours, weiPerHour);
        aboutTimer.endTimer();
        vm.stopPrank();
    }

    function _signMessage(address seller, uint256 maxHours, uint256 weiPerHour,uint256 signersPk) private pure returns (bytes memory)  {
        bytes32 messageDigest = keccak256(abi.encodePacked(
            "I agree to order from ",
            seller,
            " for a max of ",
            maxHours,
            " at a rate of ",
            weiPerHour,
            " and acknowledge I have read the terms and conditions of It's About Time!"
        )).toEthSignedMessageHash();

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signersPk, messageDigest);

        bytes memory signature = abi.encodePacked(r, s, bytes1(v));

        return signature;
    }

}
