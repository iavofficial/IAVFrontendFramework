import React, { useContext, useEffect } from "react";
import { ContextMenu } from "primereact/contextmenu";

import { AuthContext } from "../../contexts/auth";
import { LanguageContext } from "../../contexts/language";

interface Props {
    hideMenu: (e: React.KeyboardEvent) => void;
}

export const SettingsMenu = React.forwardRef<ContextMenu, Props>((props, ref) => {
    let authContext = useContext(AuthContext);
    let langContext = useContext(LanguageContext);
    let options = [];
    let notFallbackLang = false;

    // Marking active language in language selection.
    // Check whether translations for the user defined language exist. Otherwise the fallback language is displayed as active.
    if (langContext) {
        Object.keys(langContext.resources).forEach(key => {
            if (key !== langContext?.fallbackLang) {
                options.push(
                    {
                        label: langContext?.resources[key].translation.option_name,
                        icon: langContext?.activeLang === key ? "pi pi-check" : "",
                        command: () => langContext?.selectlanguage(key)
                    }
                );
                if (langContext?.activeLang === key) {
                    notFallbackLang = true;
                }
            }
        });
        options.push(
            {
                label: langContext?.resources[langContext.fallbackLang].translation.option_name,
                icon: !notFallbackLang ? "pi pi-check" : "",
                command: () => langContext?.selectlanguage(langContext.fallbackLang)
            }
        );
    }

    return (
        <div onKeyDown={(e) => props.hideMenu(e)}>
            <ContextMenu ref={ref} model={
                [
                    {
                        label: "Language",
                        icon: 'pi pi-comment',
                        items: options
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
})