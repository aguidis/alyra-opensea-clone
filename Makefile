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

mint-ganache-nft: ## Mint to admin (accounts[0]) CometSpaceshipNFT and SnakeNFT
	$(TRUFFLE) exec --network develop scripts/comet-spaceship-nft/mint.js
	$(TRUFFLE) exec --network develop scripts/poke-nft/mint.js
	$(TRUFFLE) exec --network develop scripts/snake-nft/mint.js

load-fixtures: ## Load fixtures in MarketplaceNFT
	$(TRUFFLE) exec --network develop scripts/marketplace-nft/collection-fixtures.js

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
