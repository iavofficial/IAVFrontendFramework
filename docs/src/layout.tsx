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

import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import PageNavigation from "./frontend-framework/common/drawer/pageNavigation.tsx";
import Header from "./frontend-framework/common/header/header.tsx";
import VersionLayout from "./frontend-framework/components/versionLayout.tsx";
import {versionMappings} from "./frontend-framework/versionMappings.ts";
import {useEffect} from "react";
import Imprint from "./frontend-framework/common/page/utils/imprint.tsx";

function Layout() {

    const navigate = useNavigate();
    const location = useLocation();

    const currentVersion = Object.keys(versionMappings).reverse()[0];
    const projectName = "IAVFrontendFramework";
    const basePath = `${projectName}/${currentVersion}`;

    useEffect(() => {
        if (location.pathname.endsWith(".html")) {
            navigate(location.pathname.replace(/\.html$/, ""), {replace: true});
        }
    }, [location, navigate]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to={`/${basePath}/overview`} replace/>}/>
                <Route
                    path=":projectName/:version/*"
                    element={
                        <>
                            <PageNavigation projectName={projectName} currentVersion={currentVersion}/>
                            <Header projectName={projectName}/>
                            <VersionLayout/>
                        </>
                    }
                />
                <Route path={`/:projectName/imprint`} element={<Imprint/>}/>
                <Route path="*" element={<Navigate to={`/${basePath}/overview`} replace/>}/>
            </Routes>
        </>
    );
}

export default Layout;
