Full stack ethereum blockchain app for Airbnb like page 
v0.1 in progress 

```shel
sudo apt install npm
```
```shel
git clone https://github.com/gianniskok/my-app.git
```
```shel
cd my-app
```
```shel
sudo npm install 
```
Go to node_modules/@openzeppelin/contracts-ethereum-package/contracts/math
 open SafeMath.sol 
 In line 1 change pragma Solidity from ^0.6.0 to pragma Solidity  ^0.8.0
```shel
npx hardhat compile
```
```shel
npx hardhat node
```
```shel
npx hardhat run scripts/deploy.js --network localhost
```
```shel
npm install -g json-server
json-server --watch db.json --static ./src/assets/thumbnails --port 9000
```

install metamask extention on chrome or firefox 
  create user 
  connect to localhost:8545  
  import account 0 and 19 (Copy privare keys from harhat node for addresses 0 and 19, click on metamask extension, select import accounts and paste private keyes)

```shel
npm start
```


