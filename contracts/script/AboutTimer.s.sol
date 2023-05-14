// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {AboutTimer} from '../src/AboutTimer.sol';
import { IZkBobDirectDeposits } from '../src/interfaces/IZkBobDirectDeposits.sol';
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";


contract DeployAboutTimerScript is Script {
    IERC20 constant BOB = IERC20(0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B);
    IZkBobDirectDeposits constant zkBobDDeposits = IZkBobDirectDeposits(0x668c5286eAD26fAC5fa944887F9D2F20f7DDF289);

    function run() public {
        vm.broadcast();
        AboutTimer aboutTimer = new AboutTimer(BOB, zkBobDDeposits);
        console2.log("AboutTimer:", address(aboutTimer));
    }
}
