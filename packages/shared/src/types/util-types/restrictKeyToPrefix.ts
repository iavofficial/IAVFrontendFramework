export type RestrictKeyToPrefix<T, Prefix extends string> = {
  [K in keyof T as K extends `${Prefix}${string}` ? K : never]: T[K];
};

export type EnsureKeysHavePrefix<T, Prefix extends string> =
  T extends RestrictKeyToPrefix<T, Prefix> ? T : never;
