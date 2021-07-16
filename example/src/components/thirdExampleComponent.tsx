import React, { Component, useContext } from "react";
import { FirstExampleContext } from "../contexts/FirstExampleContext";
import { Content } from "disa-framework/content";
import { useTranslation } from "react-i18next";

import { initI18next } from "disa-framework/i18n"

export const ThirdExampleComponent = () => {
    const context = useContext(FirstExampleContext);
    const { t, i18n } = useTranslation();
    initI18next();
    return (
        <Content contentElements={context ? context.contentTabs : []}>
            <div>Example data <b>global</b> context: {context ? context.exampleData : ""}</div>
            <div>Example translation: {t("test")}</div>
        </Content>
    );
}