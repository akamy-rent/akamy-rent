const _ = require('lodash');

export function bothSigned(contract) {
  const hSignature = contract.homeownerSignature;
  const tSignature = contract.tenantSignature;
  const hNotSigned = hSignature === '';
  const tNotSigned = tSignature === '';
  console.log(`h: not signed: ${hNotSigned} signature: ${hSignature}`);
  console.log(`t: not signed: ${hNotSigned} signature: ${hSignature}`);
  if (hNotSigned || tNotSigned) {
    return false;
  }
  return true;
}

export function createHomeowner(profiles, hEmail) {
  const profile = profiles.filter(p => p.owner === hEmail);
  const homeowner = {};
  homeowner.address = profile[0].walletAddress;
  homeowner.privateKey = profile[0].privateKey;
  return homeowner;
}

export function createTenant(profiles, tEmail) {
  const profile = _.filter(profiles, { owner: tEmail });
  const tenant = {};
  tenant.address = profile[0].walletAddress;
  tenant.privateKey = profile[0].privateKey;
  tenant.period = 'seconds';
  return tenant;
}
