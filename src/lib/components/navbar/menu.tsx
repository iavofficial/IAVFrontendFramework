import React, { useContext } from 'react';
import { ContextMenu } from 'primereact/contextmenu';
import { AuthContext } from '../../contexts/auth';
import { LanguageContext, Translations } from '../../contexts/language';
import { useTranslator } from '../internationalization/translators';
import { useNavigate } from 'react-router-dom';

// ##############################################
// Notice: The enclosed imports are copied from 'primereact/menuitem/MenuItem' as the path could not be resolved by the gitlab builder
// although local builds were running fine - this should be removed as soon as a fixed version of primereact is published

interface MenuItemCommandParams {
  originalEvent: React.SyntheticEvent;
  item: MenuItem;
}

interface MenuItemOptions {
  onClick(event: React.SyntheticEvent): void;
  className: string;
  labelClassName: string;
  iconClassName: string;
  element: React.ReactNode;
  props: any;
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
  command?(e: MenuItemCommandParams): void;
  template?: MenuItemTemplateType;
  [key: string]: any;
}

// ##############################################

interface SettingsOption {
  identifier: string;
  [key: string]: any;
}

export interface MenuOptions {
  additionalItems?: MenuItem[];
  options?: SettingsOption[];
}

interface Props {
  hideMenu: (e: React.KeyboardEvent) => void;
  menuOptions?: MenuOptions;
}

export const SettingsMenu = React.forwardRef<ContextMenu, Props>(
  (props, ref) => {
    const navigate = useNavigate();

    const authContext = useContext(AuthContext);
    const langContext = useContext(LanguageContext);
    const t = useTranslator();

    let options = [];
    let notFallbackLang = false;

    // Marking active language in language selection.
    // Check whether translations for the user defined language exist. Otherwise the fallback language is displayed as active.
    if (langContext) {
      Object.keys(langContext.resources).forEach((key) => {
        if (key !== langContext?.fallbackLang) {
          // Has to check whether the active language and key are equal or if the active language is a dialect of the language of key and the
          // resources don't contain the active language.
          // The active language could be "de-De" and the language of key could be "de". So it isn't sufficient to check whether the active
          // language is equal to key.
          let activeLang = langContext?.activeLang.replaceAll('-', '_');
          let active =
            activeLang === key ||
            (isDialectOf(activeLang, key) &&
              !containsLanguage(activeLang, langContext?.resources));
          options.push({
            label: langContext?.resources[key].translation.option_name,
            icon: active ? 'pi pi-check' : '',
            // I18Next must have the representation with "-" instead of "_". "de_DE" will not resolve to "de" which is necessary
            // in case translations for "de_DE" don't exist.
            command: () =>
              langContext?.selectLanguage(key.replaceAll('_', '-')),
          });
          if (active) {
            notFallbackLang = active;
          }
        }
      });
      options.push({
        label:
          langContext?.resources[langContext.fallbackLang].translation
            .option_name,
        icon: !notFallbackLang ? 'pi pi-check' : '',
        command: () => langContext?.selectLanguage(langContext.fallbackLang),
      });
    }

    const basicOptions: MenuItem[] = [
      {
        label: t('Language'),
        icon: 'pi pi-comment',
        items: options.sort((option1, option2) =>
          option1.label === option2.label
            ? 0
            : option1.label < option2.label
            ? -1
            : 1,
        ),
      },
    ];

    let logoutOption = getOptionByIdentifier(
      props.menuOptions?.options,
      'logout',
    );
    if (!logoutOption || (logoutOption && !logoutOption.hidden)) {
      basicOptions.push({
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          navigate('/login');
          authContext?.logout();
        },
      });
    }

    const model = props.menuOptions?.additionalItems
      ? [...props.menuOptions.additionalItems, ...basicOptions]
      : basicOptions;

    return (
      <div onKeyDown={(e) => props.hideMenu(e)}>
        <ContextMenu ref={ref} model={model} />
      </div>
    );
  },
);

// Checks whether "dialect" is a dialect of "baseLang".
function isDialectOf(dialect: string, baseLang: string) {
  let baseLangOfDialect = dialect.split('_')[0];
  return baseLang === baseLangOfDialect;
}

// Checks whether "resources" contain the language key "lang".
function containsLanguage(lang: string, resources: Translations) {
  let dialects = Object.keys(resources).filter((key) => key === lang);
  return dialects.length === 1;
}

function getOptionByIdentifier(
  options: SettingsOption[] | undefined,
  identifier: string,
) {
  if (options !== undefined) {
    return options.find((option) => option.identifier === identifier);
  }
  return undefined;
}
