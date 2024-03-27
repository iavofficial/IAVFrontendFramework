export type RequiredMutable<T> = {
  -readonly [K in keyof T]-?: NonNullable<T[K]>;
};
