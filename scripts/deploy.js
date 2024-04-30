const hre = require("hardhat");

async function main() {
  const Chai = await hre.ethers.getContractFactory("chai"); //fetching bytecode and ABI
  const chai = await Chai.deploy(); //creating an instance of our smart contract

  await chai.deployed();//deploying your smart contract

  console.log("Deployed contract address:",`${chai.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//0x7d132b173f66E6858bc1545366D175D47C8974E1