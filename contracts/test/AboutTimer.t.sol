// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


import {AboutTimer} from '../src/AboutTimer.sol';
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import { IZkBobDirectDeposits } from '../src/interfaces/IZkBobDirectDeposits.sol';

contract AboutTimerTest is Test {
    AboutTimer aboutTimer;
    IERC20 bob = IERC20(0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B);
    IZkBobDirectDeposits queue = IZkBobDirectDeposits(0x668c5286eAD26fAC5fa944887F9D2F20f7DDF289);
    uint256 constant BUYER_PK = 1;
    address buyer;
    address constant SELLER = address(123);
    bytes constant ZK_ADDRESS = bytes("QsnTijXekjRm9hKcq5kLNPsa6P4HtMRrc3RxVx3jsLHeo2AiysYxVJP86mz6t7k");


    using ECDSA for bytes32;


    function setUp() public {
        buyer = vm.addr(BUYER_PK);
        aboutTimer = new AboutTimer(bob, queue);
        // bob whale on polygon
        vm.prank(0x25E6505297b44f4817538fB2d91b88e1cF841B54);
        bob.transfer(buyer, 100 ether);
    }

    function testEndTimerRevertsWithNoTask() public {
        vm.expectRevert("Seller does not have a task");
        aboutTimer.endTimer();
    }
    
    function testEndTimer() public {
        console.logAddress(buyer);
        uint256 maxHours = 1;
        uint256 weiPerHour = 1 ether;
        vm.startPrank(buyer);
        bob.approve(address(aboutTimer), maxHours * weiPerHour);
        vm.stopPrank();
        vm.startPrank(SELLER);
        aboutTimer.startTimer(buyer, _signMessage(SELLER, maxHours, weiPerHour, BUYER_PK), maxHours, weiPerHour, ZK_ADDRESS);
        aboutTimer.endTimer();
        vm.stopPrank();
    }

    function _signMessage(address seller, uint256 maxHours, uint256 weiPerHour,uint256 signersPk) private pure returns (bytes memory)  {
        bytes32 messageDigest = keccak256(abi.encodePacked(
            "I agree to order from ",
            seller,
            " for a max of ",
            maxHours,
            "hours at a rate of ",
            weiPerHour,
            " and acknowledge I have read the terms and conditions of It's About Time!"
        )).toEthSignedMessageHash();

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signersPk, messageDigest);

        bytes memory signature = abi.encodePacked(r, s, bytes1(v));

        return signature;
    }

}
