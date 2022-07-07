//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SampleToken is ERC20 {
    uint256 public initialSupply = 1000000 * 10**8;

    constructor() ERC20("XyzToken", "XYZ") {
        _totalSupply = initialSupply;
        _balances[msg.sender] = initialSupply;

        // _mint(msg.sender, initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}
