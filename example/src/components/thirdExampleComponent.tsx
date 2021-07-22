import React, { Component, useContext } from "react";
import { FirstExampleContext } from "../contexts/FirstExampleContext";
import { Content } from "disa-framework/content";
import { LanguageContext } from "disa-framework/language";
import { useTranslation } from "react-i18next";

export const ThirdExampleComponent = () => {
    const context = useContext(FirstExampleContext);
    const langContext = useContext(LanguageContext);
    const { t, i18n } = useTranslation();
    console.log(langContext);
    return (
        <Content contentElements={context ? context.contentTabs : []}>
            <div>Example data <b>global</b> context: {context ? context.exampleData : ""}</div>
            <div>Example translation: {langContext?.useCustomTranslation("Imprint")}</div>
            <div>Example translation: {t("Imprint")}</div>
            <div>Example for pluralization and merging translation files: {langContext?.useCustomTranslation("bytes_example", { count: 1024 })}</div>
        </Content>
    );
}