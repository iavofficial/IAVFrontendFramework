export const MODULE_PARAM_TABLE_COLUMNS = [
    {key: "name", title: "Parameter Name"},
    {key: "type", title: "Type"},
    {key: "description", title: "Description"},
] as const;

export const MODULE_STATE_TABLE_COLUMNS = [
    {key: "name", title: "VariableName"},
    {key: "type", title: "Type"},
    {key: "description", title: "Description"},
] as const;

export const MODULE_METHOD_TABLE_COLUMNS = [
    {key: "name", title: "Method Name"},
    {key: "parameters", title: "Parameters"},
    {key: "returnType", title: "Return Type"},
    {key: "description", title: "Description"},
] as const;
