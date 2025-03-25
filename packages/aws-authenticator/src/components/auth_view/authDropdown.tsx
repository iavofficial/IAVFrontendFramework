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

import React from "react";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {
    parseLanguageResourcesIntoDropdownFormat
} from "@iavofficial/frontend-framework-shared/parseLanguageResourcesIntoDropdownFormat";
import makeStyles from "@iavofficial/frontend-framework-shared/makeStyles";
import {AuthOptions} from "@iavofficial/frontend-framework-shared/authenticationViewProps";
import {ColorSettingsType} from "@iavofficial/frontend-framework-shared/colorSettingsContext";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/moduleNames";
import {useModuleContext} from "@iavofficial/frontend-framework-shared/moduleContext";
import {InternationalizerModule} from "@iavofficial/frontend-framework-shared/internationalizerModule";
import {useDefaultSelector} from "@iavofficial/frontend-framework-shared/moduleDefaults";

const useStyles = makeStyles(({
                                  themeTogglerColor,
                                  inputFieldBackgroundColor,
                                  inputFieldTextColor
                              }: {
    themeTogglerColor: string;
    inputFieldBackgroundColor: string;
    inputFieldTextColor: string;
}) => ({
    dropdownContainer: {
        width: "100%",
        padding: "24px 24px 0px 0px"
    },
    darkModeIcon: {
        color: themeTogglerColor
    },
    dropdown: {
        width: "160px",
        backgroundColor: inputFieldBackgroundColor,
        color: inputFieldTextColor,
    }
}));

interface Props {
    authOptions: AuthOptions | undefined;
    colorSettingsContext: ColorSettingsType
    hideLanguageSelection: boolean | undefined;
}

export const AuthDropdown = <
    TModules extends {
        [MandatoryModuleNames.Internationalizer]: InternationalizerModule;
    } = {
        [MandatoryModuleNames.Internationalizer]: InternationalizerModule;
    },
>(props: Props) => {

    const {
        authOptions,
        colorSettingsContext,
        hideLanguageSelection
    } = props;

    const {classes, cx} = useStyles({});

    const {modules} = useModuleContext<TModules>();

    const intModule = modules[MandatoryModuleNames.Internationalizer];

    const activeLang = useDefaultSelector(
        (state) => state[MandatoryModuleNames.Internationalizer].activeLang,
    );

    return (
        <div className={cx("flex align-items-center justify-content-end", classes.dropdownContainer)}>
            {authOptions?.preventDarkmode === true ? (
                <></>
            ) : (
                <>
                    <i
                        onClick={() => colorSettingsContext?.setDarkmode(!colorSettingsContext.darkmode,)}
                        className={cx(`switch-colormode-logos pi ${
                            colorSettingsContext.darkmode ? "pi-moon" : "pi-sun"
                        }`, classes.darkModeIcon)}
                    />
                </>
            )}

            {!hideLanguageSelection && (
                <Dropdown
                    className={classes.dropdown}
                    placeholder={intModule.translationResources[activeLang].translation.option_name}
                    onChange={function (event: DropdownChangeEvent) {
                        intModule.selectActiveLang(event.value.key);
                    }}
                    options={parseLanguageResourcesIntoDropdownFormat(intModule.translationResources,)}
                    optionLabel="label"
                />
            )}
        </div>
    );
}
