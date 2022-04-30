// Utility functions for determining role typ on a master
// contract
export function isHomeowner(contract, username) {
  console.log(`h user: ${username}, email: ${contract.homeownerEmail}`);
  return contract.homeownerEmail === username;
}

export function isTenant(contract, username) {
  return contract.tenantEmail === username;
}
