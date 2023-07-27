export function calculateWidth(
  navbarCollapsed: boolean,
  width: number,
  addable: boolean
): number {
  if (addable) {
    width = width - 40;
  }

  return width / (navbarCollapsed ? 6 : 5);
}
