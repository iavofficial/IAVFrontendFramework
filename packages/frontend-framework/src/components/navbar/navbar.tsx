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

import React, {useContext} from "react";
import "./navbar.css";
import {TabAndContentWrapper} from "./wrappers/typesWrappers";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {calculateNavbarArrowFunctionColor} from "../../utils/calculateNavbarArrowColor";
import {NavbarSettingsContext} from "../../contexts/navbarContext";
import {
    DEFAULT_ELEMENT_SIZE,
    GAB_NAVBAR_COLLAPSED,
    NAVBAR_WIDTH_UNFOLDED,
    PADDING_GAB,
} from "@iavofficial/frontend-framework-shared/constants";
import {ColorSettingsContext} from "@iavofficial/frontend-framework-shared/colorSettingsContext";
import {generateHashOfLength} from "@iavofficial/frontend-framework-shared/hash";
import {useModule} from "@iavofficial/frontend-framework-shared/moduleContext";
import {MandatoryModuleNames} from "@iavofficial/frontend-framework-shared/moduleNames";
import {useModuleTranslation} from "@iavofficial/frontend-framework-shared/useModuleTranslation";

interface Props {
    tabAndContentWrappers: TabAndContentWrapper[];
    documentsLabelKey?: string;
    hideImprint?: boolean;
    hidePrivacyPolicy?: boolean;
}

export const Navbar = (props: Props) => {
    const t = useModuleTranslation();

    const routerModule = useModule(MandatoryModuleNames.Router);
    const Link = routerModule.Link;

    const colorSettingsContext = useContext(ColorSettingsContext);
    const navbarSettingsContext = useContext(NavbarSettingsContext);

    const navbarColor = colorSettingsContext.currentColors.navbar.backgroundColor;

    const legalDocumentsColor =
        colorSettingsContext.currentColors.navbar.legalDocumentsLinkColor;

    const navbarCollapseArrowColor =
        colorSettingsContext.currentColors.navbar.navbarCollapseArrowColor;

    const scrollbarColor =
        colorSettingsContext.currentColors.navbar.scrollbarColor;

    const identifier = generateHashOfLength(4);
    const identifierLegal = "a" + identifier;
    const identifierWithDot = "." + identifierLegal;

    return (
        <div className="h-full" style={{backgroundColor: navbarColor}}>
            <div id="navbar" className="h-full">
                <SimpleBar
                    style={{
                        height: "inherit",
                        width: navbarSettingsContext.navbarCollapsed
                            ? `${DEFAULT_ELEMENT_SIZE + 2 * GAB_NAVBAR_COLLAPSED}px`
                            : `${NAVBAR_WIDTH_UNFOLDED}px`,
                        padding: navbarSettingsContext.navbarCollapsed
                            ? "0px 2px 0px 2px"
                            : "0px 4px 0px 4px",
                        color: scrollbarColor,
                        position: "relative",
                        overflowX: "visible",
                        marginBottom: "30px",
                        flex: "0 1 auto",
                    }}
                    className="custom-scrollbar"
                >
                    <>
                        {props.tabAndContentWrappers.map((wrapper: TabAndContentWrapper) =>
                            wrapper.getNavbarComponent({
                                navbarCollapsed: navbarSettingsContext.navbarCollapsed,
                            }),
                        )}
                    </>
                </SimpleBar>
                <div
                    id="navbar-bottom-wrapper"
                    className={"text-center flex "}
                    style={
                        navbarSettingsContext.navbarCollapsed
                            ? {
                                justifyContent: "center",
                                flexDirection: "column",
                                width: "44px",
                                gap: "10px",
                            }
                            : {
                                justifyContent: "center",
                            }
                    }
                >
                    {(props.hideImprint === true && props.hidePrivacyPolicy === true) ===
                        false && (
                            <div
                                id="legal-doc-links"
                                style={{
                                    flexDirection: navbarSettingsContext.navbarCollapsed
                                        ? "unset"
                                        : "row",
                                    writingMode: navbarSettingsContext.navbarCollapsed
                                        ? "sideways-lr"
                                        : "horizontal-tb",
                                }}
                            >
                                {!props.hideImprint && (
                                    <Link
                                        className="legal-doc-link"
                                        style={{color: legalDocumentsColor}}
                                        to="/imprint"
                                    >
                                        {t({key: "Imprint"})}
                                    </Link>
                                )}
                                {!props.hidePrivacyPolicy && (
                                    <Link
                                        className="legal-doc-link"
                                        style={{color: legalDocumentsColor}}
                                        to="/privacy-policy"
                                    >
                                        {t({key: "Privacy_Policy"})}
                                    </Link>
                                )}
                            </div>
                        )}

                    {navbarSettingsContext.collapsible && (
                        <i
                            onClick={() =>
                                navbarSettingsContext.setNavbarCollapsed(
                                    !navbarSettingsContext.navbarCollapsed,
                                )
                            }
                            style={{
                                ...(!navbarSettingsContext.navbarCollapsed && {
                                    position: "absolute",
                                    right: 0,
                                }),
                                cursor: "pointer",
                                color: navbarCollapseArrowColor,
                                margin: navbarSettingsContext.navbarCollapsed
                                    ? "8px 0px 0px 0px"
                                    : `0px ${PADDING_GAB}px 0px 0px`,
                            }}
                            className={calculateNavbarArrowFunctionColor(
                                navbarSettingsContext.navbarCollapsed!,
                            )}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
