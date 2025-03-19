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

import makeStyles from "../../../../util/makeStyles.tsx";

const useStyles = makeStyles(() => ({
    wrapper: {
        position: "relative",
        paddingTop: "56.25%",
        height: 0,
        overflow: "hidden"
    },
    frame: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none"
    }
}));

interface Props {
    src: string;
}

const FigmaEmbed: React.FC<Props> = (props) => {

    const {src} = props;

    const {classes} = useStyles();

    return (
        <div className={classes.wrapper}>
            <iframe
                className={classes.frame}
                src={src}
                allowFullScreen
            />
        </div>
    );
};

export default FigmaEmbed;