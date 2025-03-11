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

    const repoAuthor = "mikewegele";
    const currentVersion = "1.5.0";
    const projectName = "iav-test-2";
    const basePath = `${projectName}/${currentVersion}`;

    const hideNavigation = location.pathname.startsWith(`${projectName}${currentVersion}/imprint`);

    if (location.pathname.includes('index.html')) {
        return <Navigate to={`${basePath}/overview`} replace/>;
    }

    if (location.pathname.includes('.html')) {
        const pathWithoutHtml = location.pathname.replace('.html', '');
        return <Navigate to={pathWithoutHtml} replace/>;
    }

    return (
        <>
            {!hideNavigation && (
                <>
                    <PageNavigation basePath={basePath}/>
                    <Header projectName={projectName} repoAuthor={repoAuthor}/>
                </>
            )}
            <Routes>
                <Route path={`${basePath}/overview`} element={<Overview/>}/>
                <Route path={`${basePath}/information`} element={<Information/>}/>
                <Route path={`${basePath}/installation-guide`} element={<InstallationGuide/>}/>
                <Route path={`${basePath}/interface`} element={<Interface/>}/>
                <Route path={`${basePath}/globaldatalayer`} element={<GlobalDataLayer/>}/>
                <Route path={`${basePath}/uilayer`} element={<UILayer/>}/>
                <Route path={`${basePath}/content-area`} element={<ContentArea/>}/>
                <Route path={`${basePath}/color-settings-and-dark-mode`} element={<ColorSettings/>}/>
                <Route path={`${basePath}/example-project`} element={<ExampleProject/>}/>
                <Route path={`${basePath}/playground`} element={<Playground/>}/>
                <Route path={`${basePath}/faq`} element={<FAQ/>}/>
                <Route path={`${basePath}/imprint`} element={<Imprint/>}/>
                <Route path="/" element={<Navigate to={`${basePath}/overview`} replace/>}/>
            </Routes>
        </>
    );
}

export default Layout;
