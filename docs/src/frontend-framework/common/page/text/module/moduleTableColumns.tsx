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

export type Column = { key: string; title: string };

export const MODULE_PARAM_TABLE_COLUMNS: Column[] = [
  { key: "name", title: "Parameter Name" },
  { key: "type", title: "Type" },
  { key: "description", title: "Description" },
];

export const MODULE_STATE_TABLE_COLUMNS: Column[] = [
  { key: "name", title: "Variable Name" },
  { key: "type", title: "Type" },
  { key: "description", title: "Description" },
];

export const MODULE_THUNKS_TABLE_COLUMNS: Column[] = [
  { key: "name", title: "Method Name" },
  { key: "parameters", title: "Parameters" },
  { key: "return_type", title: "Return Type" },
  { key: "description", title: "Description" },
];

export const MODULE_METHOD_TABLE_COLUMNS: Column[] = [
  { key: "name", title: "Method Name" },
  { key: "type", title: "Type" },
  { key: "description", title: "Description" },
];

export const MODULE_COMPONENT_TABLE_COLUMNS: Column[] = [
  { key: "name", title: "Method Name" },
  { key: "component_type", title: "Type of the Component" },
  { key: "description", title: "Description" },
];
