# Proof of Authority network performance test
This project is set up for performance measurement on the private Proof of Authority geth network.

## Set up
### PoA network initialize
1. Create accounts for sealing blocks and deploying contracts
  ```
  geth account new --datadir data
  geth account new --datadir data
  ```

2. Create genesis block with puppeth
  ```
  puppeth

	Please specify a network name to administer (no spaces, please)
	> My-Private-Chain

	What would you like to do? (default = stats)
	 1. Show network stats
	 2. Configure new genesis
	 3. Track new remote server
	 4. Deploy network components
	> 2

	Which consensus engine to use? (default = clique)
	 1. Ethash - proof-of-work
	 2. Clique - proof-of-authority
	> 2

	How many seconds should blocks take? (default = 15)
	> 5
	Which accounts are allowed to seal? (mandatory at least one)
	> 0x9ad9951b97aef8c149233c1fce610113f4473345

	Which accounts should be pre-funded? (advisable at least one)
	> 0xd587a57d659342e4de970f2c5bb5d97c91491671

	Specify your chain/network ID if you want an explicit one (default = random)
	> 1999

	What would you like to do? (default = stats)
	 1. Show network stats
	 2. Manage existing genesis
	 3. Track new remote server
	 4. Deploy network components
	> 2

	 1. Modify existing fork rules
	 2. Export genesis configuration
	> 2

	Which file to save the genesis into? (default = my-private-chain.json)
	> custom-genesis.json
	```

3. Initialize the new chain with the above genesis configuration
  ```
  geth --nodiscover --datadir data init custom-genesis.json
  ```

4. Run the new chain
  ```
  geth --nodiscover --datadir data --unlock 0x9ad9951b97aef8c149233c1fce610113f4473345,0xd587a57d659342e4de970f2c5bb5d97c91491671 --mine --rpc --rpcaddr 127.0.0.1 --rpcapi eth,net,web3,personal
  ```

### Prepare test case
Inside directory `./concurrent`, all steps below integrated in `index.js`:
1. Have seed in `./seed` ready for generating a series of wallet or accounts
2. Generate the series of accounts using `./getWallets`
3. Have the bank wallet ready using `./bank` using the prefunded account
4. Prefund from bank account to the series of wallets by `./prefund`
5. Sign all transactions from the above accounts back to bank account, using `./signTxs`
6. Broadcast and measure the time consumption for all the transactions to be finished

### Note
- If the RPC not started, manually start by `admin.startRPC()` in the Geth attached console
- Wait new block mined, before run the test script
