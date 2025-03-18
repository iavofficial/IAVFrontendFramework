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

import {Route, Routes} from "react-router-dom";
import React from "react";
import PageNavigation from "../../common/drawer/pageNavigation.tsx";
import NavLinkItem from "../../common/drawer/navLinkItem.tsx";
import PageOverview from "./pages/pageOverview.tsx";
import PageInformation from "./pages/pageInformation.tsx";
import PageInstallationGuide from "./pages/pageInstallationGuide.tsx";
import PageInterface from "./pages/pageInterface.tsx";
import PageGlobalDataLayer from "./pages/pageGlobalDataLayer.tsx";
import PageUiLayer from "./pages/pageUiLayer.tsx";
import PageContentArea from "./pages/pageContentArea.tsx";
import PageColorSettings from "./pages/pageColorSettings.tsx";
import PageExampleProject from "./pages/pageExampleProject.tsx";
import PagePlayground from "./pages/pagePlayground.tsx";
import PageFaq from "./pages/pageFaq.tsx";
import {PathRoute} from "../../common/page/pathRoute.ts";

const routes: PathRoute[] = [
    {path: "overview", label: "Quick PageOverview", element: <PageOverview/>},
    {path: "information", label: "01 - Important PagInformation", element: <PageInformation/>},
    {path: "installation-guide", label: "02 - Installation", element: <PageInstallationGuide/>},
    {path: "interface", label: "03 - PageInterface", element: <PageInterface/>},
    {path: "globaldatalayer", label: "04 - PageGlobalDataLayer", element: <PageGlobalDataLayer/>},
    {path: "uilayer", label: "05 - UiLayer", element: <PageUiLayer/>},
    {path: "content-area", label: "06 - Content Area", element: <PageContentArea/>},
    {path: "color-settings-and-dark-mode", label: "07 - Color Settings and Dark Mode", element: <PageColorSettings/>},
    {path: "example-project", label: "08 - Example Project", element: <PageExampleProject/>},
    {path: "playground", label: "09 - Playground", element: <PagePlayground/>},
];

const helpRoutes: PathRoute[] = [
    {path: "faq", label: "FAQ", element: <PageFaq/>},
];

const Version1_3_0 = () => {
    return (
        <>
            <PageNavigation>
                <ul>
                    {routes.map(({path, label}) => (
                        <NavLinkItem to={path} label={label} key={path}/>
                    ))}
                </ul>
                <h3>Need help?</h3>
                <ul>
                    {helpRoutes.map(({path, label}) => (
                        <NavLinkItem to={path} label={label} key={path}/>
                    ))}
                </ul>
            </PageNavigation>
            <Routes>
                {routes.map(({path, element}) => (
                    <Route key={path} path={path} element={element}/>
                ))}
                {helpRoutes.map(({path, element}) => (
                    <Route key={path} path={path} element={element}/>
                ))}
            </Routes>
        </>
    )
}

export default Version1_3_0;