// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {AboutTimer} from '../src/AboutTimer.sol';

import { ISuperTokenFactory, ERC20WithTokenInfo, ISuperToken } from '@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperTokenFactory.sol';

contract DeployAboutTimerScript is Script {
    // constants
    ISuperTokenFactory constant superTokenFactory = ISuperTokenFactory(0x2C90719f25B10Fc5646c82DA3240C76Fa5BcCF34);
    ERC20WithTokenInfo constant BOB = ERC20WithTokenInfo(0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B);


    function run() public {
        vm.startBroadcast();
        ISuperToken BOBx = superTokenFactory.createERC20Wrapper(BOB, ISuperTokenFactory.Upgradability.SEMI_UPGRADABLE, "Super BOB", "BOBx");
        console2.log("BOBxToken:", address(BOBx));
        AboutTimer aboutTimer = new AboutTimer(BOBx);
        console2.log("AboutTimer:", address(aboutTimer));
        vm.stopBroadcast();
    }
}
