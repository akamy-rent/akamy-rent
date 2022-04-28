import { lodash } from 'lodash/seq';

export function bothSigned(contract) {
  const hSignature = contract.homeownerSignature;
  const tSignature = contract.tenantSignature;
  const hNotSigned = hSignature === '';
  const tNotSigned = tSignature === '';
  console.log(`h: signed: ${hNotSigned} signature: ${hSignature}`);
  console.log(`t: signed: ${hNotSigned} signature: ${hSignature}`);
  if (hNotSigned || tNotSigned) {
    return false;
  }
  return true;
}

export function createHomeowner(profiles, hEmail) {
  const profile = lodash.filter(profiles, { email: hEmail });
  const homeowner = {};
  homeowner.address = profile.address;
  homeowner.privateKey = profile.privateKey;
  return homeowner;
}

export function createTenant(profiles, tEmail) {
  const profile = lodash.filter(profiles, { email: tEmail });
  const tenant = {};
  tenant.address = profile.address;
  tenant.privateKey = profile.privateKey;
  return tenant;
}
