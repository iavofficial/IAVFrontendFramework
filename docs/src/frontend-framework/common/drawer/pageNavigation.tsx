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

import makeStyles from "../../../util/makeStyles.tsx";
import React, {PropsWithChildren} from "react";

const useStyles = makeStyles(() => ({
    drawer: {
        position: "fixed",
        top: "61px",
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

const PageNavigation: React.FC<PropsWithChildren> = (props) => {

    const {classes} = useStyles();

    return (

        <div className={classes.drawer}>
            {props.children}
        </div>
    );
};

export default PageNavigation;
