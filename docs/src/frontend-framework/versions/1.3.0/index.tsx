import {Route, Routes} from "react-router-dom";
import React from "react";
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
import Imprint from "../../common/page/utils/imprint.tsx";

const Version1_3_0 = () => {
    return (
        <Routes>
            <Route path={`/overview`} element={<Overview/>}/>
            <Route path={`/information`} element={<Information/>}/>
            <Route path={`/installation-guide`} element={<InstallationGuide/>}/>
            <Route path={`/interface`} element={<Interface/>}/>
            <Route path={`/globaldatalayer`} element={<GlobalDataLayer/>}/>
            <Route path={`/uilayer`} element={<UILayer/>}/>
            <Route path={`/content-area`} element={<ContentArea/>}/>
            <Route path={`/color-settings-and-dark-mode`} element={<ColorSettings/>}/>
            <Route path={`/example-project`} element={<ExampleProject/>}/>
            <Route path={`/playground`} element={<Playground/>}/>
            <Route path={`/faq`} element={<FAQ/>}/>
            <Route path={`/imprint`} element={<Imprint/>}/>
        </Routes>
    )
}

export default Version1_3_0;