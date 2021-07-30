import React from "react";
import { withTranslation } from "react-i18next";

export interface AppliedTranslationProps {
    t: (key: string) => string
}

export const applyTranslation = (component: React.ComponentType<AppliedTranslationProps>, ...properties: any) => (
    withTranslation(...properties)(component)
)