// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {AboutTimer} from '../src/AboutTimer.sol';
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";


contract DeployAboutTimerScript is Script {
    IERC20 constant BOB = IERC20(0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B);

    function run() public {
        vm.broadcast();
        AboutTimer aboutTimer = new AboutTimer(BOB);
        console2.log("AboutTimer:", address(aboutTimer));
    }
}
