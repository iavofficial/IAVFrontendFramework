import React from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
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
import PageNavigation from "./components/drawer/pageNavigation.tsx";
import Header from "./components/header/header.tsx";

function Layout() {
    const location = useLocation();
    const hideNavigation = location.pathname === "/imprint";

    return (
        <>
            {!hideNavigation && (
                <>
                    <PageNavigation/>
                    <Header/>
                </>
            )}
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
        </>
    );
}

export default Layout;
