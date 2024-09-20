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
