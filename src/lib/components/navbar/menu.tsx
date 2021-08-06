import React, { useContext } from "react";
import { ContextMenu } from "primereact/contextmenu";

import { AuthContext } from "../../contexts/auth";
import { LanguageContext, Translations } from "../../contexts/language";
import { useTranslator } from "../internationalization/translators";

interface Props {
    hideMenu: (e: React.KeyboardEvent) => void;
}

export const SettingsMenu = React.forwardRef<ContextMenu, Props>((props, ref) => {
    const authContext = useContext(AuthContext);
    const langContext = useContext(LanguageContext);
    const t = useTranslator();

    let options = [];
    let notFallbackLang = false;

    // Marking active language in language selection.
    // Check whether translations for the user defined language exist. Otherwise the fallback language is displayed as active.
    if (langContext) {
        Object.keys(langContext.resources).forEach(key => {
            if (key !== langContext?.fallbackLang) {
                // Has to check whether the active language and key are equal or if the "base language" and key are equal but no other keys
                // which match the "base language" exist.
                // The "base language" could be "de" and the key could be "de_DE". So it isn't sufficient to check whether the active language is equal to key.
                let baseLang = langContext?.activeLang.split("_")[0];
                let active = langContext?.activeLang === key || baseLang === key && !containsMoreThanOneDialectsOf(key, langContext?.resources);
                options.push(
                    {
                        label: langContext?.resources[key].translation.option_name,
                        icon: active ? "pi pi-check" : "",
                        command: () => langContext?.selectLanguage(key)
                    }
                );
                if (active) {
                    notFallbackLang = active;
                }
            }
        });
        options.push(
            {
                label: langContext?.resources[langContext.fallbackLang].translation.option_name,
                icon: !notFallbackLang ? "pi pi-check" : "",
                command: () => langContext?.selectLanguage(langContext.fallbackLang)
            }
        );
    }

    return (
        <div onKeyDown={(e) => props.hideMenu(e)}>
            <ContextMenu ref={ref} model={
                [
                    {
                        label: t("Language"),
                        icon: 'pi pi-comment',
                        items: options.sort((option1, option2) => option1.label === option2.label ? 0 : option1.label < option2.label ? -1 : 1)
                    },
                    {
                        label: "Logout",
                        icon: "pi pi-sign-out",
                        command: () => { authContext?.logout() }
                    }
                ]
            } />
        </div>
    );
});

function containsMoreThanOneDialectsOf(lang: string, resources: Translations) {
    let dialects = Object.keys(resources).filter(key => key.split("_")[0] === lang);
    return dialects.length > 1;
}