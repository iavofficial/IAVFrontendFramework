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

import React from "react";

const generateClassName = (prefix: string): string =>
    `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

const createCSS = (className: string, styles: any): string => {
    let cssString = '';

    for (const key in styles) {
        const value = styles[key];
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            const selector = key.replace('&', `.${className}`);
            cssString += `${selector} { ${createCSS(className, value)} } `;
        } else {
            const cssProp = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            cssString += `${cssProp}: ${value}; `;
        }
    }
    return cssString;
};

type NestedCSSProperties = React.CSSProperties & {
    [selector: string]: React.CSSProperties | NestedCSSProperties | undefined;
};

const makeStyles = <
    T extends Record<
        string,
        NestedCSSProperties | ((props?: any) => NestedCSSProperties)
    >,
>(
    styles: (props?: any) => T,
) => {
    return (props?: any) => {
        const classes = {} as Record<keyof T, string>;
        const stylesObj = styles(props || {});

        for (const key in stylesObj) {
            const className = generateClassName(key);
            const styleDefinition = stylesObj[key];
            const styleWithDynamicValues =
                typeof styleDefinition === "function"
                    ? styleDefinition(props || {})
                    : styleDefinition;

            const styleString = createCSS(className, styleWithDynamicValues);
            const styleElement = document.createElement("style");
            styleElement.textContent = `.${className} { ${styleString} }`;
            document.head.appendChild(styleElement);
            //@ts-ignore
            classes[key] = className;
        }
        return {classes};
    };
};

export default makeStyles;
