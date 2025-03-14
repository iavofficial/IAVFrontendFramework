import { Column } from "../utils/table";

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

export const MODULE_METHOD_TABLE_COLUMNS: Column[] = [
  { key: "name", title: "Method Name" },
  { key: "parameters", title: "Parameters" },
  { key: "return_type", title: "Return Type" },
  { key: "description", title: "Description" },
];
