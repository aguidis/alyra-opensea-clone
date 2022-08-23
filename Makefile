#!make

# Executables: local only
TRUFFLE = truffle
NPM = npm

# Misc
.DEFAULT_GOAL = help

## —— React Box Makefile ——————————————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

install: ## Install node_modules in root folder and client subfolder
	$(NPM) ci
	cd client && $(NPM) ci

## —— Truffle —————————————————————————————————————————————————————
compile: ## Compile smart contracts located in contracts folder
	$(TRUFFLE) compile

migrate-ganache: ## Deploy contracts locally (You need to have a running Ganache node)
	$(TRUFFLE) migrate --reset --network develop

migrate-ganache-marketplace: ## Deploy contracts locally (You need to have a running Ganache node)
	$(TRUFFLE) migrate --network develop -f 2 --to 2

migrate-rinkeby: ## Deploy contracts on Rinkeby testnet
	$(TRUFFLE) migrate --reset --network rinkeby

mint-ganache-nft: ## Mint all NFT to account[0] except for PokeNFT (15 per Ganache account)
	$(TRUFFLE) exec --network develop scripts/comet-spaceship-nft/mint.js
	$(TRUFFLE) exec --network develop scripts/poke-nft/mint.js
	$(TRUFFLE) exec --network develop scripts/snake-nft/mint.js

load-fixtures: ## Load fixtures in NFTMarketplace
	$(TRUFFLE) exec --network develop scripts/marketplace-nft/collection-fixtures.js

boot-ganache: ## Boot all stuff
	$(TRUFFLE) migrate --reset --network develop
	$(TRUFFLE) exec --network develop scripts/comet-spaceship-nft/mint.js
	#$(TRUFFLE) exec --network develop scripts/poke-nft/mint.js
	#$(TRUFFLE) exec --network develop scripts/snake-nft/mint.js
	$(TRUFFLE) exec --network develop scripts/marketplace-nft/collection-fixtures.js

debug-marketplace: ## Debug NFTMarketplace
	$(TRUFFLE) exec --network develop scripts/marketplace-nft/debug-collections.js

count-collections: ## Debug NFTMarketplace
	$(TRUFFLE) exec --network develop scripts/marketplace-nft/count-collections.js

debug-factory-creation: ## Debug Factory creation
	$(TRUFFLE) exec --network develop scripts/collection-factory/debug-creation.js

debug-factory-balance: ## Debug Factory balance
	$(TRUFFLE) exec --network develop scripts/collection-factory/debug-balance.js

## —— Dapp ————————————————————————————————————————————————————————
run: ## Start local server
	$(NPM) run dev --prefix client

build: ## Prepare assets for production
	$(NPM) run build --prefix client

preview: ## will boot up local static web server that serves the files from dist
	$(NPM) run preview --prefix client

lint: ## Lint assets
	$(NPM) run lint --prefix client

format: ## Format assets
	$(NPM) run format --prefix client

fix-js: ## Lint + Format assets
	make lint
	make format
