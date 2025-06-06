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

import translationES from "./assets/translations/es.json";
import {GlobalDataLayer} from "@iavofficial/frontend-framework/globalDataLayer";
import {DummyAuthenticationProvider} from "@iavofficial/frontend-framework/dummyAuthenticationProvider";
import translationEN from "./assets/translations/en.json";
import translationDE from "./assets/translations/de.json";
import translationDECH from "./assets/translations/de-CH.json";
import Layout from "./Layout.tsx";
import {Amplify} from "aws-amplify";
import {cognitoUserPoolsTokenProvider} from "aws-amplify/auth/cognito";
import {CookieStorage} from "aws-amplify/utils";

const cognitoPool = import.meta.env.VITE_COGNITO_POOL;
const cognitoAppId = import.meta.env.VITE_COGNITO_APP_ID;
const domain = import.meta.env.VITE_DOMAIN;

const configureAmplify = () => {
    Amplify.configure({
        Auth: {
            Cognito: {
                userPoolId: cognitoPool,
                userPoolClientId: cognitoAppId,
            },
        },
    });
    cognitoUserPoolsTokenProvider.setKeyValueStorage(
        new CookieStorage({
            domain: domain,
            path: "/",
            expires: 365,
            // @ts-ignore
            secure: domain !== "localhost",
            sameSite: "lax",
        }),
    );
};

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
            additionalContextValues={{getUserGroups: () => []}}
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
