import React, { ReactElement } from "react";

export interface ContentbarWrapperInterface {
  getContentbarElement(
    contentElementWidth: number,
    selectedId: string,
    idOfFirstElement: string
  ): ReactElement;
  getKey(): string;
  getId(): string;
  getContentAreaElement(): React.ReactElement;
}
