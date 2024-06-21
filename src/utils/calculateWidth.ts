import {
  DEFAULT_ELEMENTSIZE,
  DEFAULT_WIDTH_CONTENTSECTIONELEMENT,
} from "../constants";

export function calculateWidth(
  navbarCollapsed: boolean,
  width: number,
  addable: boolean,
  overflow: boolean
): number {
  if (!overflow) {
    return DEFAULT_WIDTH_CONTENTSECTIONELEMENT;
  }

  if (addable) {
    width = width - DEFAULT_ELEMENTSIZE;
  }

  return width / (navbarCollapsed ? 6 : 5);
}
