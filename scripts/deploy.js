const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();
  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const ApartmentCreator = await hre.ethers.getContractFactory("ApartmentCreator");
  const apartmentCreator = await ApartmentCreator.deploy({ value: ethers.utils.parseEther("2.0") });
  await apartmentCreator.deployed();
  console.log("ApartmentCreator deployed to:", apartmentCreator.address);

  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
