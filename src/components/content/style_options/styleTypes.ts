export interface StyleProps<T> {
  appliedStyles?: StylesArray<T>;
  applyAllStyles?: boolean;
}

// Array of values of a type T
export type StylesArray<T> = T[keyof T][];
