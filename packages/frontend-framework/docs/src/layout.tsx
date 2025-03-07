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
import makeStyles from "../../src/components/content/style_options/makeStyles.tsx";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Overview from "./pages/overview.tsx";
import Information from "./pages/information.tsx";
import InstallationGuide from "./pages/installationGuide.tsx";
import Interface from "./pages/interface.tsx";
import GlobalDataLayer from "./pages/globalDataLayer.tsx";
import UILayer from "./pages/uiLayer.tsx";
import ContentArea from "./pages/contentArea.tsx";
import ColorSettings from "./pages/colorSettings.tsx";
import ExampleProject from "./pages/exampleProject.tsx";
import Playground from "./pages/playground.tsx";
import FAQ from "./pages/faq.tsx";
import Imprint from "./components/page/utils/imprint.tsx";

const useStyles = makeStyles(() => ({
    wrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
    }
}));

const Layout: React.FC = () => {

    const {classes} = useStyles();

    return (
        <div className={classes.wrapper}>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/overview" replace/>}/>
                    <Route path="/overview" element={<Overview/>}/>
                    <Route path="/information" element={<Information/>}/>
                    <Route path="/installation-guide" element={<InstallationGuide/>}/>
                    <Route path="/interface" element={<Interface/>}/>
                    <Route path="/globaldatalayer" element={<GlobalDataLayer/>}/>
                    <Route path="/uilayer" element={<UILayer/>}/>
                    <Route path="/content-area" element={<ContentArea/>}/>
                    <Route path="/color-settings-and-dark-mode" element={<ColorSettings/>}/>
                    <Route path="/example-project" element={<ExampleProject/>}/>
                    <Route path="/playground" element={<Playground/>}/>
                    <Route path="/faq" element={<FAQ/>}/>
                    <Route path="/imprint" element={<Imprint/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default Layout;