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
 **/

import React, {useContext} from "react";
import {AuthenticationViewProps} from "@iavofficial/frontend-framework-shared/authenticationViewProps";
import {BLUE3, PADDING_GAB, WHITE} from "@iavofficial/frontend-framework-shared/constants";
import CompanyLogo from "../../assets/svg/companyLogo";
import {ColorSettingsContext} from "@iavofficial/frontend-framework-shared/colorSettingsContext";


export const CompanyLogoDefault = (props: AuthenticationViewProps) => {

    const colorSettingsContext = useContext(ColorSettingsContext);

    return (
        <div
            style={{
                display: props.headerOptions?.hideRight ? "none" : "flex",
                alignItems: "center",
                paddingRight: `${PADDING_GAB}px`,
            }}
        >
            <CompanyLogo fill={colorSettingsContext?.darkmode ? BLUE3 : WHITE}/>
        </div>
    )
};
