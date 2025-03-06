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
import makeStyles from "../../../../src/components/content/style_options/makeStyles.tsx";
import PageLink from "../page/text/pageLink.tsx";

const useStyles = makeStyles(() => ({
    footer: {
        width: "100%",
        padding: "16px 0",
        backgroundColor: "#ffffff",
        borderTop: "1px solid lightgray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}));

const Footer = () => {

    const {classes} = useStyles()

    return (
        <div className={classes.footer}>
            <PageLink to={"/imprint"} label={"Imprint"} target={"_blank"}/>
        </div>
    );
}

export default Footer;