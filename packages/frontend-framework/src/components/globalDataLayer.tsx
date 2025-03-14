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

import React, {Fragment, PropsWithChildren, useEffect} from "react";
import {CookiesProvider} from "react-cookie";
import {Translations} from "../contexts/language";
import {
  DefaultLanguageProvider,
  LanguageOptions,
} from "./internationalization/defaultLanguageProvider";
import {ColorProvider, ColorProviderProps} from "../coloring/colorProvider";
import {BrowserRouter} from "react-router-dom";
import {EnhancedStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {ModuleContextProvider} from "../contexts/providers/moduleContextProvider";
import {DEFAULT_FALLBACK_LANGUAGE} from "@iavofficial/frontend-framework-shared/constants";
import {
  FFMandatoryState,
  FFAllMandatoryModules,
} from "@iavofficial/frontend-framework-shared/moduleOrchestrationTypes";
import {FFModule} from "@iavofficial/frontend-framework-shared/generalModule";
import {checkIfUserModulesKeysValid} from "@iavofficial/frontend-framework-shared/checkIfUserModulesKeysValid";
import {seperateModuleTypes} from "@iavofficial/frontend-framework-shared/seperateModuleTypes";

// Create this type to make fallbackLang optional for the user.
type GlobalDataLayerLanguageOptions = Omit<LanguageOptions, "fallbackLang"> & {
  fallbackLang?: string;
};

interface Props<TState extends FFMandatoryState> {
  modules: FFAllMandatoryModules<TState> & Record<string, FFModule>;
  store: EnhancedStore<TState>;
  languageOptions?: GlobalDataLayerLanguageOptions;
  translations?: Translations;
  initI18Next?: () => void;
  colorSettings?: ColorProviderProps;
}

export const GlobalDataLayer = <TState extends FFMandatoryState>(
  props: PropsWithChildren<Props<TState>>,
) => {
  // Throw an error if user modules do not meet the convention that
  // they have to begin with a specific prefix.
  useEffect(() => {
    const seperatedModules = seperateModuleTypes(props.modules);
    checkIfUserModulesKeysValid({
      userStoreModules: seperatedModules.userStoreModules,
      userNonStoreModules: seperatedModules.userNonStoreModules,
    });
  }, [props.modules]);

  const fallbackLang =
    props.languageOptions?.fallbackLang ?? DEFAULT_FALLBACK_LANGUAGE;
  const initialLang =
    props.languageOptions?.initialLang ?? DEFAULT_FALLBACK_LANGUAGE;
  const languageOptions = {
    fallbackLang,
    initialLang,
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

const ModuleLifecycleCaller = (
  props: PropsWithChildren<{
    modules: Record<string, FFModule>;
  }>,
) => {
  // React hooks have to be called in the same order at every render.
  // Because of this the sort method is used to create an array of the
  // modules in a stable order.
  const moduleKeys = React.useMemo(
    () => Object.keys(props.modules).sort(),
    [props.modules],
  );

  let renderChildren = true;

  // Call the useModuleLifecycle Hook for every module.
  // This approach is only safe if moduleKeys is stable (because of the
  // Hook rules).
  moduleKeys.forEach((key) => {
    const useModuleLifecycle =
      props.modules[key].useModuleLifecycle ??
      (() => ({
        renderChildren: true,
      }));
    const lifecycleReturnVal = useModuleLifecycle();

    if (!lifecycleReturnVal.renderChildren) {
      renderChildren = lifecycleReturnVal.renderChildren;
    }
  });

  return renderChildren ? props.children : <Fragment />;
};
