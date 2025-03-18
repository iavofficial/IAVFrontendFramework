import i18next from "i18next";
import {useTranslation as useTranslationI18next} from "react-i18next";
import {useEffect, useState} from "react";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  InternationalizationModule,
  InternationalizationState,
  LangResources,
} from "../../../types/modules/internationalization/internationalizationModule";
import {DEFAULT_TRANSLATION_RESOURCES} from "../../../constants/defaultTranslations";
import {useDefaultDispatch} from "../../module_orchestration/moduleDefaults";
import {initI18nextDefault} from "./initI18nextDefault";
import {useCookiesAccepted} from "../../../utils/cookieHooks";
import {MandatoryModuleNames} from "../../../constants/moduleNames";

const DEFAULT_FALLBACK_LANG = "en";

const selectActiveLangDefault = (lang: string) => {
  console.error(`The function is not initialized yet. This error
        inidicates an error in your application.`);
};

type InitI18NextFunction = (params: {
  resources: LangResources;
  acceptedCookies: boolean;
  fallbackLang: string;
}) => void;

type I18NextInternationalizerParams = {
  fallbackLang?: string;
  initI18next?: InitI18NextFunction;
  forcedInitialLang?: string;
  translationResources?: LangResources;
};

export class I18NextInternationalizer
  implements InternationalizationModule<InternationalizationState>
{
  public slice;
  public fallbackLang;
  public translationResources;
  public selectActiveLang = selectActiveLangDefault;
  public useTranslation;
  public useModuleLifecycle;

  constructor(params?: I18NextInternationalizerParams) {
    const fallbackLang = params?.fallbackLang ?? DEFAULT_FALLBACK_LANG;
    const initI18next = params?.initI18next ?? initI18nextDefault;
    const forcedInitialLang = params?.forcedInitialLang;
    const customTranslationResources = params?.translationResources;

    this.fallbackLang = fallbackLang;

    const initialState = {
      activeLang: forcedInitialLang ?? fallbackLang,
    };

    this.slice = createSlice({
      name: MandatoryModuleNames.Internationalization,
      initialState: initialState,
      reducers: {
        setActiveLang: (state, action: PayloadAction<string>) => {
          state.activeLang = action.payload;
        },
      },
    });

    const {setActiveLang} = this.slice.actions;

    const mergedTranslationResources = structuredClone(
      DEFAULT_TRANSLATION_RESOURCES,
    );

    if (customTranslationResources) {
      Object.keys(customTranslationResources).forEach((key) => {
        if (Object.keys(mergedTranslationResources).includes(key)) {
          type keyType = keyof typeof mergedTranslationResources;
          Object.assign(
            mergedTranslationResources[key as keyType].translation,
            customTranslationResources[key].translation,
          );
        } else {
          // @ts-ignore Bug: Marks props.translations as possibly undfined although it's not.
          mergedTranslationResources[key] = customTranslationResources[key];
        }
      });
    }

    this.translationResources = mergedTranslationResources;

    this.useTranslation = () => {
      const [t] = useTranslationI18next();
      return (params: {key: string; options?: Record<string, unknown>}) => {
        const options = params?.options ?? {};
        return t(params.key, options);
      };
    };

    this.useModuleLifecycle = () => {
      const [isInitialized, setIsInitialized] = useState(false);
      const cookiesAccepted = useCookiesAccepted();
      const dispatch = useDefaultDispatch();

      useEffect(() => {
        this.selectActiveLang = (lang: string) => {
          i18next.changeLanguage(lang);
          dispatch(setActiveLang(lang));
        };

        initI18next({
          acceptedCookies: cookiesAccepted,
          fallbackLang: fallbackLang,
          resources: mergedTranslationResources,
        });

        if (forcedInitialLang) {
          this.selectActiveLang(forcedInitialLang);
        } else {
          this.selectActiveLang(
            i18next.language === "de-DE" ? "de" : i18next.language,
          );
        }

        setIsInitialized(true);
      });

      return {
        renderChildren: isInitialized,
      };
    };
  }
}
