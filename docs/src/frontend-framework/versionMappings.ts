// src/versionMappings.ts
export const versionMappings = {
    "1.1.0": () => import("./versions/1.1.0"),
    "1.3.0": () => import("./versions/1.3.0"),
};
