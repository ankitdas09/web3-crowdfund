
## About The Project

[![Screen Shot][product-screenshot]]()

Web3CrowdFund, a blockchain-powered application that reimagines crowdfunding with enhanced transparency, security, and community involvement. This platform allows users to create campaigns, contribute Ethereum, and participate in decision-making through a decentralized voting system.

How It Works
* Create Campaigns: Users initiate campaigns with clear objectives and fundraising goals.
* Contribute: Contributors support campaigns by donating Ethereum.
* Spending Requests: Campaign owners can propose spending requests when funds are needed.
* Voting System: Contributors vote on spending requests to collectively decide whether to approve or reject.
* Transparent Transactions: All transactions and decisions are recorded on the blockchain for accountability.


### Built With

This project was developed using the following technologies.

* ![Typescript][Typescript-url]
* ![Solidity][Solidity-url]
* ![Next][Next.js]
* ![Semantic UI][SemanticUI-url]
* ![Mocha][Mocha-url]


## Getting Started

Follow the following steps to set up this project on your machine.

### Prerequisites

Download and install the correct version of node. This project was developed on node version 20.

[nvm Official Documentaion](https://github.com/nvm-sh/nvm)

* nvm
  ```sh
  nvm install 20
  nvm use 20
  ```

* Ganache
    ```sh
    npm install ganache --global
    ```
    Start the local RPC server using:
    ```sh
    ganache
    ```


### Installation

_Steps to setup the development environment_

1. Start the Ganache RPC server
2. Clone the repo
   ```sh
   git clone https://github.com/ankitdas09/web3-crowdfund.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
   or
   ```sh
   yarn
   ```
4. Compile the contracts

   ```sh
   node ethereum/compile.js
   ```
5. Deploy the CampaignFactory contract
   ```sh
   node ethereum/deploy.js
   ```

6. Replace the contract address in ethereum/factory.js with your own campaign address.

   ```js
   const instance = new web3.eth.Contract(
	CampaignFactory.abi,
	'your-contract-address',
   );
   ```
Done!

Start the Next app using
```sh
npm run dev
```
or
```sh
yarn dev
```

## Screenshots

Project screenshots.

_For more information related to working of this project, please refer to the [Video](https://example.com)_



[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: screenshot/product.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Solidity-url]:https://img.shields.io/badge/Solidity-grey?style=for-the-badge&logo=solidity
[Mocha-url]:https://img.shields.io/badge/Mocha-green?style=for-the-badge&logo=mocha
[Typescript-url]:https://img.shields.io/badge/typescript-black?style=for-the-badge&logo=typescript
[SemanticUI-url]:https://img.shields.io/badge/Semantic%20UI-black?style=for-the-badge&logo=semanticui
