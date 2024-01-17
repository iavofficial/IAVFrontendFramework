export function calculateNavbarArrowFunctionColor(navbarCollapsed: boolean) {
  let returnValue = "";
  if (navbarCollapsed) {
    returnValue = "pi pi-chevron-right";
  } else {
    returnValue = "pi pi-chevron-left";
  }

  return returnValue;
}
