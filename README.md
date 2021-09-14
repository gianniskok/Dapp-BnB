# Full stack ethereum blockchain app for apartment renting 

#### v0.1 in progress  :

  - [x] Create an apartment ad 
  - [x] Rent an apartment
  - [ ] Release the apartment
  - [x] Transfer Tokens for paying rent and fee 
  - [ ] Dynamicly add new Renting ads in json-server 
  - [ ] ...


### Disclaimer
- json-server is gonna get deprecated the only reason i use it is for front-end ideas 






## __Here's how to deploy this project:__

1. Clone the repo
```shel
git clone https://github.com/gianniskok/my-app.git
```
2. Go to my-app folder
```shel
cd my-app
```
3. Install the dependencies
```shel
sudo npm install 
```

4. Go to node_modules/@openzeppelin/contracts-ethereum-package/contracts/math 

- open SafeMath.sol 
 
- In line 1 change pragma Solidity from "^0.6.0 " to "^0.8.0"

5. Start the local test node
```shel
npx hardhat node
```
6. Deploy the contract
```shel
npx hardhat run scripts/deploy.js --network localhost
```
7. Install json-server
```shel
npm install -g json-server
json-server --watch db.json --static ./src/assets/thumbnails --port 9000
```

8. install metamask extention on chrome or firefox.
  - create user.
  - connect to localhost:8545 .
  - import account 0 and 19.
  _(Copy privare keys from harhat node for addresses 0 and 19, click on metamask extension, select import accounts and paste private keys)._
  Click [here](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account) for more info on metamask import accounts

9. Run the app
```shel
npm start
```


#### Feel free to contact me on giannis.kokkoros@hotmail.com for more info
