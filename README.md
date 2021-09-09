Full stack ethereum blockchain app for Airbnb like page 

v0.1 in progress 

Here's how to deploy this project:

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

----open SafeMath.sol 
 
----In line 1 change pragma Solidity from ^0.6.0 to pragma Solidity  ^0.8.0

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

9. create user.

10. connect to localhost:8545 .

11. import account 0 and 19.

----Copy privare keys from harhat node for addresses 0 and 19, click on metamask extension, select import accounts and paste private keyes.

12. Run the app
```shel
npm start
```


