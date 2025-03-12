import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import PageNavigation from "./frontend-framework/common/drawer/pageNavigation.tsx";
import Header from "./frontend-framework/common/header/header.tsx";
import VersionLayout from "./frontend-framework/components/versionLayout.tsx";
import {versionMappings} from "./frontend-framework/versionMappings.ts";
import {useEffect} from "react";

function Layout() {

    const navigate = useNavigate();
    const location = useLocation();

    const currentVersion = Object.keys(versionMappings).reverse()[0];
    const projectName = "iav-test-2";
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
                    path={`${projectName}/:version/*`}
                    element={
                        <>
                            <PageNavigation projectName={projectName} currentVersion={currentVersion}/>
                            <Header projectName={projectName}/>
                            <VersionLayout/>
                        </>
                    }
                />
                <Route path="*" element={<Navigate to="/index.html" replace/>}/>
            </Routes>
        </>
    );
}

export default Layout;
