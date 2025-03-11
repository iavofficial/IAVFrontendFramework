import {Navigate, Route, Routes} from "react-router-dom";
import PageNavigation from "./frontend-framework/common/drawer/pageNavigation.tsx";
import Header from "./frontend-framework/common/header/header.tsx";
import VersionLayout from "./frontend-framework/components/versionLayout.tsx";

function Layout() {

    const repoAuthor = "iavofficial";
    const currentVersion = "1.3.0";
    const projectName = "IAVFrontendFramework";
    const basePath = `${projectName}/${currentVersion}`;

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
                            <VersionLayout/>
                        </>
                    }
                />
            </Routes>
        </>
    );
}

export default Layout;
