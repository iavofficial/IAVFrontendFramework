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

import {useTranslator} from "@iavofficial/frontend-framework/translators";
import {ImprintText} from "@iavofficial/frontend-framework/imprint";
import {useContext} from "react";
import {ColorSettingsContext} from "@iavofficial/frontend-framework/colorSettingsContext";
import "@iavofficial/frontend-framework/globalColors.css";

export const LegalDocuments = () => {
    const t = useTranslator();
    const colorSettingsContext = useContext(ColorSettingsContext);

    return (
        <div
            className={
                (colorSettingsContext?.darkmode ? "bg-black" : "bg-grey-1") + " p-3"
            }
            style={{height: "100%", width: "100%", overflow: "auto"}}
        >
            <div
                className={
                    (colorSettingsContext?.darkmode ? "bg-grey-6" : "bg-white-1") +
                    " flex px-3"
                }
                style={{
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                    overflow: "auto",
                }}
            >
                <div
                    className={
                        colorSettingsContext?.darkmode ? "color-blue-3" : "color-red"
                    }
                    style={{
                        textAlign: "center",
                        fontSize: "25px",
                        fontWeight: "bolder",
                    }}
                >
                    {t("Customized_legal_documents")}
                </div>
                <ImprintText/>
            </div>
        </div>
    );
};
