export function containsOneOrMoreGroups(
  userGroups: string[],
  totalGroups: string[],
) {
  for (let i = 0; i < userGroups.length; i++) {
    if (totalGroups.includes(userGroups[i])) {
      return true;
    }
  }
  return false;
}
