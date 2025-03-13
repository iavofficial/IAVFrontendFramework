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
import PageNavigation from "../../common/drawer/pageNavigation.tsx";
import NavLinkItem from "../../common/drawer/drawerLink.tsx";
import { ModulesInDepth } from "./pages/modulesInDepth.tsx";

const routes = [
    {path: "overview", label: "Quick Overview", element: <Overview/>},
    {path: "information", label: "01 - Important Information", element: <Information/>},
    {path: "installation-guide", label: "02 - Installation", element: <InstallationGuide/>},
    {path: "interface", label: "03 - Interface", element: <Interface/>},
    {path: "globaldatalayer", label: "04 - GlobalDataLayer", element: <GlobalDataLayer/>},
    {path: "uilayer", label: "05 - UILayer", element: <UILayer/>},
    {path: "content-area", label: "06 - Content Area", element: <ContentArea/>},
    {path: "color-settings-and-dark-mode", label: "07 - Color Settings and Dark Mode", element: <ColorSettings/>},
    {path: "modules-in-depth", label: "08 - Modules in depth", element: <ModulesInDepth/>},
    {path: "example-project", label: "09 - Example Project", element: <ExampleProject/>},
    {path: "playground", label: "10 - Playground", element: <Playground/>},
];

const helpRoutes = [
    {path: "faq", label: "FAQ", element: <FAQ/>},
];

const Version2_0_0 = () => {

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
    );
};

export default Version2_0_0;