const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();
  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  const RivalIntervalTreeLibrary = await hre.ethers.getContractFactory("RivalIntervalTreeLibrary");
  const rivalIntervalTree = await RivalIntervalTreeLibrary.deploy();
  await rivalIntervalTree.deployed();
  console.log("RivalIntervalTree deployed to:", rivalIntervalTree.address);

  const CreateApartment = await hre.ethers.getContractFactory("CreateApartment", {
    libraries: {
      RivalIntervalTreeLibrary :rivalIntervalTree.address
    }
  });
  const createApartment = await CreateApartment.deploy();
  await createApartment.deployed();
  console.log("CreateApartment deployed to:", createApartment.address);

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
