Full stack ethereum blockchain app for Airbnb like page 
v0.1 in progress 

 
```shel
sudo apt install npm
--in my-app folder---
sudo npm install 
cd node_modules/@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol 
-change pragma Solidity to ^0.8.0
cd src/app/components/apartmentCreator/index.jsx 
  -Change path of { ApartmentCreator, CreateApartment, Token} to your path folder
cd src/app/components/serviceCard/index.jsx 
  -Change path of  { ApartmentCreator, CreateApartment, Token} to your location folder
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
npm install -g json-server
json-server --watch db.json --static ./src/assets/thumbnails --port 9000
install metamask extention chrome or firefox { 
  create user 
  create localhost [url: 127.0.0.1:8545, chainId 1337]
  import account 0 and 19 
}
npm start
```


