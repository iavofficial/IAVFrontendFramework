export function generateHash(value: string) {
  let hash = 0,
    i,
    chr;
  if (value.length === 0) return hash.toString();
  for (i = 0; i < value.length; i++) {
    chr = value.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash.toString();
}

export function generateHashForValues(values: string[]) {
  const concatenatedValues = values.join("");
  return generateHash(concatenatedValues);
}

export function generateHashOfLength(length: number) {
  let result: string = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
