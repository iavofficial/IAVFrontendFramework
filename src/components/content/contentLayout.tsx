import React, {PropsWithChildren} from "react";
import {ContentStyle, ContentStyleProps} from "./contentStyle";

export enum LayoutBehaviour {
  // Parent div of content will have no specific layout class
  NONE = "",
  // Parent div will be prime react grid
  GRID = "grid grid-nogutter",
  // Parent will be flexbox
  FLEX = "flex",
  // Parent will be flexbox column
  FLEX_COL = "flex flex-column",
}

export interface ContentLayoutProps {
  layoutBehaviour?: LayoutBehaviour;
}

export type ContentLayoutAndStyleProps = ContentLayoutProps & {
  contentStyle?: ContentStyleProps;
}

const DEFAULT_LAYOUT_BEHAVIOUR = LayoutBehaviour.NONE;

export const ContentLayout = (props: PropsWithChildren<ContentLayoutAndStyleProps>) => {
  const layoutBehaviour = props.layoutBehaviour ?? DEFAULT_LAYOUT_BEHAVIOUR;

  return (
    <ContentStyle {...props.contentStyle}>
      <div className={`h-full w-full ${layoutBehaviour}`}>{props.children}</div>
    </ContentStyle>
  );
};
