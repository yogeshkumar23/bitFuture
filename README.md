[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![vite](https://img.shields.io/badge/created%20with-vite-ddbb00.svg)](https://vitejs.dev/)
[![hardhat](https://img.shields.io/badge/created%20with-hardhat-ccb200.svg)](https://hardhat.org/)
[![Alchemy](https://img.shields.io/badge/NFT%20reference%20with-alchemy-254CDD.svg)](https://www.alchemy.com/)
[![Ionic](https://img.shields.io/badge/Mobile%20app%20created%20with-ionic-000000.svg)](https://ionicframework.com/)

# DooWorld

## Development setup

- After cloning the repository, to install all the dependencies run the following command in your terminal / command prompt.

  ```bash
  npx lerna bootstrap --scope=APPNAME
  ```

- After installing all the dependencies, rename a `.env-example` file to `.env` in the `packages/APPNAME` folder.

- After setting up Configure NFT setup

  ```bash
  # NFT Contract test
  npx lerna run dev --stream --scope=nft

  # NFT Contract test
  npx lerna run test --stream --scope=nft

  # Compile contract
  npx lerna run build --stream --scope=nft

  # deploy contract
  npx lerna run deploy --stream --scope=nft
  ```

- After setting up the `.env`, to run the development server run the following command in your terminal / command prompt.

  ```bash
  npx lerna run dev --stream --scope=APPNAME
  ```

- Run the following command in your terminal / command prompt for build web app.

  ```bash
  #production mode
  npx lerna run build:prod --stream --scope=APPNAME

  #development mode
  npx lerna run build:dev --stream --scope=APPNAME
  ```

- Setup IP address as `crypto-srever` in `/etc/hosts` (or) `C:\Windows\System32\Drivers\etc\hosts` and run the following command in your terminal / command prompt for deploy
- AWS: `keyfile.pem` key file needed in app folder for this deployment

  ```bash
  # deploy through scp
  npx lerna run deploy:scp --stream --scope=APPNAME

  # deploy through scp with .pem filer
  npx lerna run deploy:scp:key --stream --scope=APPNAME

  # deploy through rsync
  npx lerna run deploy:rsync --stream --scope=APPNAME

  # deploy through rsync with .pem file
  npx lerna run deploy:rsync:key --stream --scope=APPNAME
  ```

- Mobile App build `Android & IOS`

  ```bash
  #init capacitor
  npx lerna run app:init --stream --scope=APPNAME

  #build android and ios apps
  npx lerna run ionic:build --stream --scope=APPNAME
  ```
