/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
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

import React, {PropsWithChildren} from "react";
import {CookiesProvider} from "react-cookie";
import {Translations} from "../contexts/language";
import {
  DefaultLanguageProvider,
  LanguageOptions,
} from "./internationalization/defaultLanguageProvider";
import {ColorProvider, ColorProviderProps} from "../coloring/colorProvider";
import {DEFAULT_FALLBACK_LANGUAGE} from "../constants";
import {BrowserRouter} from "react-router-dom";
import {EnhancedStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {FFMandatoryModules, FFMandatoryState} from "../store";
import {ModuleContextProvider} from "../providers/moduleContextProvider";
import {AuthState} from "@iavofficial/frontend-framework-shared-types/authenticationProvider";

// Create this type to make fallbackLang optional for the user.
type GlobalDataLayerLanguageOptions = Omit<LanguageOptions, "fallbackLang"> & {
  fallbackLang?: string;
};

interface Props<TAuthState extends AuthState> {
  modules: FFMandatoryModules<TAuthState> & Record<string, unknown>;
  store: EnhancedStore<FFMandatoryState>;
  languageOptions?: GlobalDataLayerLanguageOptions;
  translations?: Translations;
  initI18Next?: () => void;
  colorSettings?: ColorProviderProps;
}

export const GlobalDataLayer = <TAuthState extends AuthState>(
  props: PropsWithChildren<Props<TAuthState>>,
) => {
  const fallbackLang =
    props.languageOptions?.fallbackLang ?? DEFAULT_FALLBACK_LANGUAGE;
  const initialLang =
    props.languageOptions?.initialLang ?? DEFAULT_FALLBACK_LANGUAGE;
  const languageOptions = {
    fallbackLang: fallbackLang,
    initialLang: initialLang,
  };

  return (
    <ModuleContextProvider modules={props.modules}>
      <Provider store={props.store}>
        <ModuleLifecycleCaller modules={props.modules}>
          <CookiesProvider>
            <DefaultLanguageProvider
              languageOptions={languageOptions}
              translations={props.translations}
              initI18Next={props.initI18Next}
            >
              <ColorProvider {...props.colorSettings}>
                <BrowserRouter>{props.children}</BrowserRouter>
              </ColorProvider>
            </DefaultLanguageProvider>
          </CookiesProvider>
        </ModuleLifecycleCaller>
      </Provider>
    </ModuleContextProvider>
  );
};

const ModuleLifecycleCaller = <TAuthState extends AuthState>(
  props: PropsWithChildren<{
    modules: FFMandatoryModules<TAuthState> & Record<string, any>;
  }>,
) => {
  // Create a sorted, stable array of module keys.
  const moduleKeys = React.useMemo(
    () => Object.keys(props.modules).sort(),
    [props.modules],
  );

  // For each module, call its hook (or a no-op) in the same order every render.
  moduleKeys.forEach((key) => {
    const useModuleLifecycle =
      props.modules[key].useModuleLifecycle ?? (() => {});
    // IMPORTANT: Do not place hook calls inside loops if the number of iterations could change.
    // This approach is only safe if moduleKeys is stable between renders.
    useModuleLifecycle();
  });

  return props.children;
};
