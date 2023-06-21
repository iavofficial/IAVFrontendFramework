export function calculateNavbarArrowFunctionColor(
  navbarCollapsed: boolean,
  darkmode: boolean
) {
  let returnValue = '';
  if (navbarCollapsed) {
    returnValue = 'pi pi-chevron-right';
  } else {
    returnValue = 'pi pi-chevron-left';
  }

  if (darkmode) {
    returnValue = returnValue + ' color-grey-3';
  } else {
    returnValue = returnValue + ' color-black';
  }

  return returnValue;
}
