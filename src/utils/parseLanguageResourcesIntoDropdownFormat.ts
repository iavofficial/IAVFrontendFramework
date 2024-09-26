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

export function parseLanguageResourcesIntoDropdownFormat(resourcesObject: any) {
  const resourcesObjectArray: any[] = [];
  Object.keys(resourcesObject).forEach((key: string) => {
    const resourceElementWithKey: any = {
      key: key,
      element: resourcesObject[key],
    };

    const resourceObject = {
      label: resourcesObject[key].translation.option_name,
      value: resourceElementWithKey,
    };
    resourcesObjectArray.push(resourceObject);
  });

  return resourcesObjectArray;
}

export function parseActiveLanguageKeyIntoLanguageName(
  key: string,
  resourceObject: any,
) {
  const resourceElementWithKey: any = {
    key: key,
    element: resourceObject[key],
  };

  const returnResourceObject = {
    label: resourceObject[key].translation.option_name,
    value: resourceElementWithKey,
  };

  return returnResourceObject;
}
