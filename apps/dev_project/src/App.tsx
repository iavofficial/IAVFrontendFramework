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

import translationES from "./assets/translations/es.json";
import {GlobalDataLayer} from "@iavofficial/core/globalDataLayer";
import {DummyAuthenticationProvider} from "@iavofficial/core/dummyAuthenticationProvider";
import translationEN from "./assets/translations/en.json";
import translationDE from "./assets/translations/de.json";
import translationDECH from "./assets/translations/de-CH.json";
import Layout from "./Layout.tsx";

function App() {

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

    return (
        <DummyAuthenticationProvider
            additionalContextValues={{ getUserGroups: () => [] }}
        >
            <GlobalDataLayer
                translations={translations}
                colorSettings={{
                    colorOptions: {},
                }}
            >
                <Layout/>
            </GlobalDataLayer>
        </DummyAuthenticationProvider>
    );
}

export default App;
