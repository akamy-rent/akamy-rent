// Utility functions for determining role typ on a master
// contract
export function isHomeowner(contract, username) {
  return contract.homeownerEmail === username;
}

export function isTenant(contract, username) {
  return contract.tenantEmail === username;
}
