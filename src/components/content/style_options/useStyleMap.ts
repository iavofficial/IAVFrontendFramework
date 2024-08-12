import { useMemo } from "react";

/**
 * This hook takes in an array of styles which should be applied and generates an array of classes and styles
 * (like backgroundColor) out of it. For this the hook uses the provided maps. If applyAllStyles is
 * passed, the hook will return classes and styles for all style options of allStyles.
 * @param allStyles 
 * @param classesMap 
 * @param stylesMap 
 * @param appliedStyles 
 * @param applyAllStyles 
 * @returns 
 */
export const useStyleMap = <T extends object>(
  allStyles: T,
  classesMap?: Partial<Record<keyof T, string | number>>,
  stylesMap?: Partial<Record<keyof T, object>>,
  appliedStyles?: (T[keyof T])[],
  applyAllStyles?: boolean
) => {
  const finalAppliedStyles = useMemo(() => {
    return applyAllStyles ? Object.values(allStyles) : appliedStyles ?? [];
  }, [applyAllStyles, appliedStyles]);

  const classNames = useMemo(() => {
    let classNames = "";
    finalAppliedStyles.forEach((styleOption) => {
      if (classesMap?.hasOwnProperty(styleOption)) {
        // @ts-ignore styleOption has to be a key of the object since this is the condition.
        const className = classesMap[styleOption];
        classNames = `${classNames} ${className}`;
      }
    });
    return classNames;
  }, [finalAppliedStyles]);

  const styles = useMemo(() => {
    let styles = {};
    finalAppliedStyles.forEach((styleOption) => {
      if (stylesMap?.hasOwnProperty(styleOption)) {
        // @ts-ignore styleOption has to be a key of the object since this is the condition.
        const style = stylesMap[styleOption];
        styles = {...styles, ...style};
      }
    });
    return styles;
  }, [finalAppliedStyles]);

  return [classNames, styles] as [string, object];
};
