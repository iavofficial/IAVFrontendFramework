/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
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

import {useMemo} from "react";

/**
 * This hook takes in an array of styles which should be applied and generates an array of classes and styles
 * (like backgroundColor) out of it. For this the hook uses the provided maps. If applyAllStyles is
 * passed, the hook will return classes and styles for all style options of allStyles.
 * @param allStyles
 * @param classesMap
 * @param stylesMap
 * @param appliedStyles
 * @param applyAllStyles
 * @returns
 */
// The generic type T (all the styles) should have string keys a only with strings as it`s value
export const useStyleMap = <T extends {[key: string]: string}>(
  classesMap?: Partial<Record<keyof T, string | number>>,
  stylesMap?: Partial<Record<keyof T, object>>,
  appliedStyles?: T[keyof T][],
  styleDependencies?: {[key: string]: T[keyof T][]},
) => {
  const finalAppliedStyles = useMemo(() => {
    let tempAppliedStyles: T[keyof T][] = appliedStyles ?? [];

    if (!appliedStyles || !styleDependencies) {
      return tempAppliedStyles;
    }

    Object.keys(styleDependencies).forEach((key) => {
      if (tempAppliedStyles.includes(key as T[keyof T])) {
        tempAppliedStyles = [...tempAppliedStyles, ...styleDependencies[key]];
      }
    });

    return tempAppliedStyles;
  }, [appliedStyles, styleDependencies]);

  const classNames = useMemo(() => {
    let classNames = "";
    finalAppliedStyles.forEach((styleOption) => {
      //eslint-disable-next-line
      if (classesMap?.hasOwnProperty(styleOption)) {
        // @ts-ignore styleOption has to be a key of the object since this is the condition.
        const className = classesMap[styleOption];
        classNames = `${classNames} ${className}`;
      }
    });
    return classNames;
  }, [classesMap, finalAppliedStyles]);

  const styles = useMemo(() => {
    let styles = {};
    finalAppliedStyles.forEach((styleOption) => {
      //eslint-disable-next-line
      if (stylesMap?.hasOwnProperty(styleOption)) {
        // @ts-ignore styleOption has to be a key of the object since this is the condition.
        const style = stylesMap[styleOption];
        styles = {...styles, ...style};
      }
    });
    return styles;
  }, [finalAppliedStyles, stylesMap]);

  return [classNames, styles] as [string, object];
};
