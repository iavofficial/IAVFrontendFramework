import { DEFAULTWIDTHCONTENTSECTIONELEMENT } from "../constants";

export function calculateWidth(
  navbarCollapsed: boolean,
  width: number,
  addable: boolean,
  overflow: boolean
): number {
  if (!overflow) {
    return DEFAULTWIDTHCONTENTSECTIONELEMENT;
  }

  if (addable) {
    width = width - 40;
  }

  return width / (navbarCollapsed ? 6 : 5);
}
