export type RequiredMutable<T> = {
  -readonly [K in keyof T]-?: NonNullable<T[K]>;
};

export type DeepRequired<T> = {
  [K in keyof T]-?: NonNullable<T[K]> extends (infer U)[]
    ? DeepRequiredArray<U>
    : NonNullable<T[K]> extends object
      ? DeepRequired<NonNullable<T[K]>>
      : NonNullable<T[K]>;
};

interface DeepRequiredArray<T> extends Array<DeepRequired<T>> {}
