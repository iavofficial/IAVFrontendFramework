import React, { Component } from 'react';
import { Content, LayoutBehaviour } from 'disa-framework/content';
import { SecondExampleContext } from '../contexts/SecondExampleContext';
import {
  AppliedTranslationProps,
  applyTranslation,
} from 'disa-framework/translators';

class FourthExampleComponentUnprocessed extends Component<AppliedTranslationProps> {
  constructor(props: AppliedTranslationProps) {
    super(props);
  }

  render() {
    return (
      <Content layoutBehaviour={LayoutBehaviour.FLEX} contentElements={[]}>
        <div>{this.props.t('component_deactivated')}</div>
      </Content>
    );
  }
}

FourthExampleComponentUnprocessed.contextType = SecondExampleContext;

export const FourthExampleComponent = applyTranslation(
  FourthExampleComponentUnprocessed
);
