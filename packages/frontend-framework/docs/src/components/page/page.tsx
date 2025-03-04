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

import React, {PropsWithChildren} from "react";
import makeStyles from "../../../../src/components/content/style_options/makeStyles.tsx";

const useStyles = makeStyles(() => ({
    wrapper: {
        backgroundColor: "#f8f9fa",
    },
    page: {
        flex: 1,
        padding: "20px",
        margin: "60px auto 20px auto",
        width: "60%",
        textAlign: "justify"
    }
}));

const Page: React.FC<PropsWithChildren> = (props) => {

    const {classes} = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.page}>
                {props.children}
            </div>
        </div>
    );
}

export default Page;