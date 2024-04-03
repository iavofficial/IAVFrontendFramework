export const determineCurrentColorInsideGroup = (
  state: {
    isActive: boolean;
    isHovering: boolean;
    isDisabled: boolean;
    isInsideActiveGroup: boolean;
  },
  colors: {
    activeColor: string;
    hoverColor: string;
    defaultColor: string;
    insideActiveGroupColor: string;
  }
) => {
  const { isActive, isHovering, isDisabled, isInsideActiveGroup } = state;
  const { activeColor, hoverColor, defaultColor, insideActiveGroupColor } =
    colors;

  if (isActive && !isDisabled) {
    return activeColor;
  }

  if (isHovering && !isDisabled) {
    return hoverColor;
  }

  if (isInsideActiveGroup && !isDisabled) {
    return insideActiveGroupColor;
  }

  return defaultColor;
};

export const determineCurrentColor = (
  state: {
    isActive: boolean;
    isHovering: boolean;
    isDisabled: boolean;
  },
  colors: {
    activeColor: string;
    hoverColor: string;
    defaultColor: string;
  }
) => {
  return determineCurrentColorInsideGroup(
    {
      ...state,
      isInsideActiveGroup: false,
    },
    {
      ...colors,
      insideActiveGroupColor: "",
    }
  );
};
