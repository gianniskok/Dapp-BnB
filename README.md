Full stack ethereum blockchain app for Airbnb like page 
v0.1 in progress 


```shel
npm install 
go to /my-app/node_modules/@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol and change pragma Solidity to ^0.8.0
go to src/app/components/apartmentCreator/index.jsx and change location of { ApartmentCreator, CreateApartment, Token} to your location folder
go to src/app/components/serviceCard/index.jsx and change location of  { ApartmentCreator, CreateApartment, Token} to your location folder
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
npm install -g json-server
json-server --watch db.json --static ./src/assets/thumbnails --port 9000
install metamask extention chrome or firefox 
create user 
create localhost [url: 127.0.0.1:8545, chainId 1337]
import account 0 and 19 
npm start
```


