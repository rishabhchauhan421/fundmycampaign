import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const factory = new web3.eth.Contract(
  CampaignFactory.abi,
  process.env.NEXT_PUBLIC_CAMPAIGNFACTORYADDRESS
);

export default factory;
