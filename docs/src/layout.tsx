import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import PageNavigation from "./frontend-framework/common/drawer/pageNavigation.tsx";
import Header from "./frontend-framework/common/header/header.tsx";
import VersionLayout from "./frontend-framework/components/versionLayout.tsx";


function Layout() {
    const location = useLocation();

    const repoAuthor = "mikewegele";
    const currentVersion = "1.5.0";
    const projectName = "iav-test-2";
    const basePath = `${projectName}/${currentVersion}`;

    if (location.pathname.includes('index.html')) {
        return <Navigate to={`${basePath}/overview`} replace/>;
    }

    if (location.pathname.includes('.html')) {
        const pathWithoutHtml = location.pathname.replace('.html', '');
        return <Navigate to={pathWithoutHtml} replace/>;
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to={`/${basePath}/overview`} replace/>}/>
                <Route
                    path={`${projectName}/:version/*`}
                    element={
                        <>
                            <PageNavigation projectName={projectName} currentVersion={currentVersion}/>
                            <Header projectName={projectName} repoAuthor={repoAuthor}/>
                            <VersionLayout projectName={projectName}/>
                        </>
                    }
                />
            </Routes>
        </>
    );
}

export default Layout;
