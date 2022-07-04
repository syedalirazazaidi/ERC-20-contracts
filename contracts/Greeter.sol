//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Greeter is ERC20 {
    uint256 public initialSupply = 1000000*10**8;
    constructor() ERC20("Gold", "GLD") {
        _mint(msg.sender, initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return 10*10**6*10**decimals();
    }
     function mint(address account, uint256 amount) public  returns (bool) {
         require(initialSupply+ amount <=totalSupply(),"max supply exceeded");
         require( amount <=1000*10**8,"mint limited amount");
         _mint(account ,amount);
         return true;
    }

}

// contract Greeter {
//     string private greeting;

//     constructor(string memory _greeting) {
//         console.log("Deploying a Greeter with greeting:", _greeting);
//         greeting = _greeting;
//     }

//     function greet() public view returns (string memory) {
//         return greeting;
//     }

//     function setGreeting(string memory _greeting) public {
//         console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
//         greeting = _greeting;
//     }
// }
