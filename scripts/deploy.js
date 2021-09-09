const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();
  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  const CreateApartment = await hre.ethers.getContractFactory("CreateApartment");
  const createApartment = await CreateApartment.deploy();
  await createApartment.deployed();
  console.log("CreateApartment deployed to:", createApartment.address);

  const ApartmentCreator = await hre.ethers.getContractFactory("ApartmentCreator");
  const apartmentCreator = await ApartmentCreator.deploy();
  await apartmentCreator.deployed();
  console.log("ApartmentCreator deployed to:", apartmentCreator.address);

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
