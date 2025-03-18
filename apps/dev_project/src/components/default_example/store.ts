import { MandatoryModuleNames } from "@iavofficial/frontend-framework/constants";
import { I18NextInternationalizer } from "@iavofficial/frontend-framework/defaultModules";
import {
  createModules,
  StoreBuilder,
} from "@iavofficial/frontend-framework/store";
import translationES from "../../assets/translations/es.json";
import translationEN from "../../assets/translations/en.json";
import translationDE from "../../assets/translations/de.json";
import translationDECH from "../../assets/translations/de-CH.json";

const translations = {
  es: {
    translation: translationES,
  },
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
  de_CH: {
    translation: translationDECH,
  },
};

const customModules = {
  [MandatoryModuleNames.Internationalization]: new I18NextInternationalizer({
    translationResources: translations,
  }),
};

export const modules = createModules(customModules);

export const store = new StoreBuilder(modules.storeModules).build();

export const useModuleContextTyped = modules.useModuleContextTyped;
export const useModuleTyped = modules.useModuleTyped;

/*const {modules: modulesTest} = useModuleContextTyped();
const authModule = useModuleTyped(MandatoryModuleNames.Authentication);*/