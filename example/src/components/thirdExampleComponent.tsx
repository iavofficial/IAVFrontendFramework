import React, { useContext } from "react";
import { FirstExampleContext } from "../contexts/FirstExampleContext";
import { Content } from "disa-framework/content";
import { useTranslation } from "disa-framework/internationalization_hooks";

export const ThirdExampleComponent = () => {
    const context = useContext(FirstExampleContext);
    const t = useTranslation();
    return (
        <Content contentElements={context ? context.contentTabs : []}>
            <div>Example data <b>global</b> context: {context ? context.exampleData : ""}</div>
            <div>Example translation: {t("Imprint")}</div>
            <div>Example for pluralization and merging translation files: {t("bytes_example", { count: 1024 })}</div>
        </Content>
    );
}