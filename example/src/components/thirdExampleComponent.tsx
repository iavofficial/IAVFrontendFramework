import React, { useContext } from "react";
import { FirstExampleContext } from "../contexts/FirstExampleContext";
import { Content } from "disa-framework/content";
import { useTranslation } from "disa-framework/internationalization_hooks";

export const ThirdExampleComponent = () => {
    const context = useContext(FirstExampleContext);
    const t = useTranslation();
    return (
        <Content contentElements={context ? context.contentTabs : []}>
            <div>{t("Example_global_context")}: {context ? context.exampleData : ""}</div>
            <div>{t("Example_translation")}: {t("Imprint")}</div>
            <div>{t("Example_pluralization_merging")}: {t("bytes_example", { count: 1024 })}</div>
        </Content>
    );
}