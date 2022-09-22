import Web3 from 'web3';
import 'dotenv/config';

const web3 = new Web3(process.env.HTTP_PROVIDER_RINKEBY);

export { web3 };
