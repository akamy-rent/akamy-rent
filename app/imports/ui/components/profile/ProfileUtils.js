// utility functions for profiles
export function getFullname(first, last) {
  return `${first} ${last}`;
}

export function getFullnameFromProfile(profile) {
  return getFullname(profile?.firstName ?? '', profile?.lastName ?? ';');
}
