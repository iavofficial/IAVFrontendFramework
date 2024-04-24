export function parseLanguageRessourcesIntoDropdownFormat(
  ressourcesObject: any
) {
  let ressourcesObjectArray: any[] = [];
  Object.keys(ressourcesObject).forEach((key: string) => {
    let ressourceElementWithKey: any = {
      key: key,
      element: ressourcesObject[key],
    };

    let ressourceObject = {
      label: ressourcesObject[key].translation.option_name,
      value: ressourceElementWithKey,
    };
    ressourcesObjectArray.push(ressourceObject);
  });

  return ressourcesObjectArray;
}

export function parseActiveLanguageKeyIntoLanguageName(
  key: string,
  ressourceObject: any
) {
  let ressourceElementWithKey: any = {
    key: key,
    element: ressourceObject[key],
  };

  let returnRessourceObject = {
    label: ressourceObject[key].translation.option_name,
    value: ressourceElementWithKey,
  };

  return returnRessourceObject;
}