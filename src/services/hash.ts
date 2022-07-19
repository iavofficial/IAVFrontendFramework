export function generateHash(value: string) {
  let hash = 0, i, chr;
  if (value.length === 0) return hash.toString();
  for (i = 0; i < value.length; i++) {
    chr = value.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash.toString();
};

export function generateHashForValues(values: string[]) {
  const concatenatedValues = values.join("");
  return generateHash(concatenatedValues);
};