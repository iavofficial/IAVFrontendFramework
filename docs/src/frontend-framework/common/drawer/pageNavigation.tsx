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

import {useParams} from "react-router-dom";
import makeStyles from "../../../util/makeStyles.tsx";
import NavLinkItem from "./drawerLink.tsx";

const useStyles = makeStyles(() => ({
    drawer: {
        position: "fixed",
        top: "50px",
        left: "0",
        width: "200px",
        height: "100%",
        backgroundColor: "#ffffff",
        borderRight: "1px solid lightgray",
        zIndex: 1000,
        padding: "20px",
        fontSize: "0.875rem",
        "& ul": {
            listStyle: "none",
            padding: 0,
            margin: 0
        },
        "& li": {
            marginBottom: "8px",
            padding: "3px 0px",
            borderRadius: "4px",
            transition: "background-color 0.3s ease",
        },
    },
}));

interface Props {
    projectName: string;
    currentVersion: string;
}

const PageNavigation: React.FC<Props> = (props) => {

    const {projectName, currentVersion} = props;
    const {classes} = useStyles();

    const {version} = useParams<{ version: string }>();
    const basePath = `/${projectName}/${version || currentVersion}`;

    return (
        <div className={classes.drawer}>
            <ul>
                <NavLinkItem to={`${basePath}/overview`} label={"Quick Overview"}/>
                <NavLinkItem to={`${basePath}/information`} label={"01 - Important Information"}/>
                <NavLinkItem to={`${basePath}/installation-guide`} label={"02 - Installation"}/>
                <NavLinkItem to={`${basePath}/interface`} label={"03 - Interface"}/>
                <NavLinkItem to={`${basePath}/globaldatalayer`} label={"04 - GlobalDataLayer"}/>
                <NavLinkItem to={`${basePath}/uilayer`} label={"05 - UILayer"}/>
                <NavLinkItem to={`${basePath}/content-area`} label={"06 - Content Area"}/>
                <NavLinkItem to={`${basePath}/color-settings-and-dark-mode`}
                             label={"07 - Color Settings and Dark Mode"}/>
                <NavLinkItem to={`${basePath}/example-project`} label={"08 - Example Project"}/>
                <NavLinkItem to={`${basePath}/playground`} label={"09 - Playground"}/>
            </ul>
            <h3>Need help?</h3>
            <ul>
                <NavLinkItem to={`${basePath}/faq`} label={"FAQ"}/>
            </ul>
        </div>
    );
};

export default PageNavigation;
