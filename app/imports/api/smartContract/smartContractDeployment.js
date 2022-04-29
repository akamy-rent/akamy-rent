export function bothSigned(contract) {
  const hSignature = contract.homeownerSignature;
  const tSignature = contract.tenantSignature;
  const hSigned = hSignature !== '';
  const tSigned = tSignature !== '';
  console.log(`h:${hSigned}{${hSignature}}, t${tSigned}{${tSignature}}`);
  return hSigned && tSigned;
}

export function createHomeowner(profiles, email) {
  const profile = profiles.find(p => p.owner === email);
  return {
    address: profile.walletAddress,
    privateKey: profile.privateKey,
  };
}

export function createTenant(profiles, email) {
  return {
    ...createHomeowner(profiles, email),
    period: 'seconds',
  };
}
