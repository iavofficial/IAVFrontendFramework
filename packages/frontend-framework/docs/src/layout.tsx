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

    const hideNavigation = location.pathname.startsWith(`IAVFrontendFramework${"1.4.0"}/imprint`);

    if (location.pathname.includes('.html')) {
        const pathWithoutHtml = location.pathname.replace('.html', '');
        return <Navigate to={pathWithoutHtml} replace/>;
    }

    return (
        <>
            {!hideNavigation && (
                <>
                    <PageNavigation/>
                    <Header/>
                </>
            )}
            <Routes>
                <Route path={`${BASE_PATH}/overview`} element={<Overview/>}/>
                <Route path={`${BASE_PATH}/information`} element={<Information/>}/>
                <Route path={`${BASE_PATH}/installation-guide`} element={<InstallationGuide/>}/>
                <Route path={`${BASE_PATH}/interface`} element={<Interface/>}/>
                <Route path={`${BASE_PATH}/globaldatalayer`} element={<GlobalDataLayer/>}/>
                <Route path={`${BASE_PATH}/uilayer`} element={<UILayer/>}/>
                <Route path={`${BASE_PATH}/content-area`} element={<ContentArea/>}/>
                <Route path={`${BASE_PATH}/color-settings-and-dark-mode`} element={<ColorSettings/>}/>
                <Route path={`${BASE_PATH}/example-project`} element={<ExampleProject/>}/>
                <Route path={`${BASE_PATH}/playground`} element={<Playground/>}/>
                <Route path={`${BASE_PATH}/faq`} element={<FAQ/>}/>
                <Route path={`${BASE_PATH}/imprint`} element={<Imprint/>}/>
                <Route path="/" element={<Navigate to={`${BASE_PATH}/overview`} replace/>}/>
            </Routes>
        </>
    );
}

export default Layout;
