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
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {PropsWithChildren, useEffect} from "react";
import makeStyles from "../../../util/makeStyles.tsx";
import Footer from "../footer/footer.tsx";
import OnThisPage from "../drawer/onThisPage.tsx";

const useStyles = makeStyles(() => ({
    wrapper: {
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column"
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={classes.wrapper}>
            <OnThisPage/>
            <div className={classes.page}>
                {props.children}
            </div>
            <Footer/>
        </div>
    );
}

export default Page;