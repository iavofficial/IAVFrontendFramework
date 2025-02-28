export const MandatoryModuleNames = {
  Authentication: "auth",
} as const;

export type MandatoryModuleName = typeof MandatoryModuleNames[keyof typeof MandatoryModuleNames];