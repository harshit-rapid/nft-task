import Web3 from 'web3';

const web3 = new Web3(
  'https://rinkeby.infura.io/v3/a7fe863c5f044170ababe8300c20eb75',
  // new Web3.providers.HttpProvider(process.env.HTTP_PROVIDER_RINKEBY),
);

export { web3 };
