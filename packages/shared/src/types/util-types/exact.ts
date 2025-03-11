export type Exact<T, U extends T> = T & {
  // This additional constraint ensures that U has no keys beyond those in T.
  [K in keyof U]: K extends keyof T ? U[K] : never;
};
