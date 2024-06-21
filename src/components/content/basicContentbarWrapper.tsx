import React from "react";
import { generateHashOfLength } from "../../utils/hash";
import { ContentbarWrapperInterface } from "./contentbarWrapperInterface";
import { DefaultContentSelectionElement } from "./defaultContentSelectionElement";
import { TranslationFunction } from "../../types/translationFunction";

interface ConstructorArgs {
  id: string;
  displayName: string | TranslationFunction;
  onClick: (value: string) => any;
  contentAreaElement: React.ReactElement;
  closable?: boolean;
  onClose?: (value: string) => void;
}

export class BasicContentbarWrapper implements ContentbarWrapperInterface {
  constructor(private args: ConstructorArgs) {}

  getKey() {
    return generateHashOfLength(6);
  }

  getId() {
    return this.args.id;
  }

  getContentAreaElement(): React.ReactElement {
    return this.args.contentAreaElement;
  }

  getContentbarElement(contentElementWidth: number, selectedId: string) {
    return (
      <DefaultContentSelectionElement
        key={this.getKey()}
        displayName={this.args.displayName}
        id={this.args.id}
        closable={this.args.closable}
        selected={this.args.id === selectedId}
        onClick={this.args.onClick}
        width={contentElementWidth}
        onClose={this.args.onClose}
      />
    );
  }
}
