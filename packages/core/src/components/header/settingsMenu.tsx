/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useContext} from "react";
import {ContextMenu} from "primereact/contextmenu";
import {LanguageContext, Translations} from "../../contexts/language";
import {useTranslator} from "../internationalization/translators";
import {RadioButton} from "primereact/radiobutton";
import {ColorSettingsContext} from "../../contexts/colorsettings";

// ##############################################
// Notice: The enclosed imports are copied from 'primereact/menuitem/MenuItem' as the path could not be resolved by the gitlab builder
// although local builds were running fine - this should be removed as soon as a fixed version of primereact is published

interface MenuItemCommandParams {
  originalEvent: React.SyntheticEvent;
  item: MenuItem;
}

interface MenuItemOptions {
  className: string;
  labelClassName: string;
  iconClassName: string;
  element: React.ReactNode;
  props: any;

  onClick(event: React.SyntheticEvent): void;

  [key: string]: any;
}

type MenuItemTemplateType =
  | React.ReactNode
  | ((item: MenuItem, options: MenuItemOptions) => React.ReactNode);

export interface MenuItem {
  label?: string;
  icon?: any;
  url?: string;
  items?: MenuItem[] | MenuItem[][];
  expanded?: boolean;
  disabled?: boolean;
  target?: string;
  separator?: boolean;
  style?: object;
  className?: string;
  template?: MenuItemTemplateType;

  command?(e: MenuItemCommandParams): void;

  [key: string]: any;
}

export interface SettingsMenuOptions {
  additionalItems?: MenuItem[];
  hideLanguageSelection?: boolean;
  hideColorThemeToggler?: boolean;
}

interface Props {
  hideMenu: (e: React.KeyboardEvent) => void;
  menuOptions?: SettingsMenuOptions;
}

//eslint-disable-next-line
export const SettingsMenu = React.forwardRef<ContextMenu, Props>(
  (props, ref) => {
    const colorSettingsContext = useContext(ColorSettingsContext);

    const langContext = useContext(LanguageContext);
    const t = useTranslator();

    const basicOptions: MenuItem[] = [];
    let notFallbackLang = false;

    if (!props.menuOptions?.hideLanguageSelection) {
      // Marking active language in language selection.
      // Check whether translations for the user defined language exist. Otherwise the fallback language is displayed as active.
      if (langContext) {
        const languageOptions = [];
        Object.keys(langContext.resources).forEach((key) => {
          if (key !== langContext?.fallbackLang) {
            // Has to check whether the active language and key are equal or if the active language is a dialect of the language of key and the
            // resources don't contain the active language.
            // The active language could be "de-De" and the language of key could be "de". So it isn't sufficient to check whether the active
            // language is equal to key.
            const activeLang = langContext?.activeLang.replaceAll("-", "_");
            const active =
              activeLang === key ||
              (isDialectOf(activeLang, key) &&
                !containsLanguage(activeLang, langContext?.resources));
            languageOptions.push({
              label: langContext?.resources[key].translation.option_name,
              icon: active ? "pi pi-check" : "",
              // I18Next must have the representation with "-" instead of "_". "de_DE" will not resolve to "de" which is necessary
              // in case translations for "de_DE" don't exist.
              command: () => {
                langContext?.selectLanguage(key.replaceAll("_", "-"));
              },
            });
            if (active) {
              notFallbackLang = active;
            }
          }
        });
        languageOptions.push({
          label:
            langContext?.resources[langContext.fallbackLang].translation
              .option_name,
          icon: !notFallbackLang ? "pi pi-check" : "",
          command: () => langContext?.selectLanguage(langContext.fallbackLang),
        });

        basicOptions.push({
          label: t("Language"),
          icon: "pi pi-comment",
          items: languageOptions.sort((option1, option2) =>
            option1.label === option2.label
              ? 0
              : option1.label < option2.label
                ? -1
                : 1,
          ),
        });
      }
    }

    if (!props.menuOptions?.hideColorThemeToggler) {
      const colorSetting = colorSettingsContext?.darkmode
        ? "bg-grey-5 color-white"
        : " bg-white-1 color-black";
      basicOptions.push({
        template: (
          <div
            className={colorSetting + " flex justify-content-center mt-2 mb-2"}
          >
            <div className="flex align-items-center">
              <RadioButton
                inputId="lightMode"
                value={false}
                onChange={(e) => colorSettingsContext?.setDarkmode(e.value)}
                checked={!colorSettingsContext?.darkmode}
              />
              <label htmlFor="ingredient1" className="ml-1 mr-2">
                Lightmode
              </label>
            </div>
            <div className="flex align-items-center">
              <RadioButton
                inputId="darkMode"
                value={true}
                onChange={(e) => colorSettingsContext?.setDarkmode(e.value)}
                checked={colorSettingsContext?.darkmode}
              />
              <label htmlFor="ingredient2" className="ml-1">
                Darkmode
              </label>
            </div>
          </div>
        ),
      });
    }

    const model = props.menuOptions?.additionalItems
      ? [...props.menuOptions.additionalItems, ...basicOptions]
      : basicOptions;

    return (
      <div onKeyDown={(e) => props.hideMenu(e)}>
        <ContextMenu
          style={{width: "14.5rem", padding: "0.25rem 1rem 0.25rem 1rem"}}
          ref={ref}
          model={model}
        />
      </div>
    );
  },
);

// Checks whether "dialect" is a dialect of "baseLang".
function isDialectOf(dialect: string, baseLang: string) {
  const baseLangOfDialect = dialect.split("_")[0];
  return baseLang === baseLangOfDialect;
}

// Checks whether "resources" contain the language key "lang".
function containsLanguage(lang: string, resources: Translations) {
  const dialects = Object.keys(resources).filter((key) => key === lang);
  return dialects.length === 1;
}
