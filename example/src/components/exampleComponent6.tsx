import { Content, LayoutBehaviour } from 'disa-framework/content';
import { CellPaddings, ContentCell } from 'disa-framework/contentCell';
import { useTranslator } from 'disa-framework/translators';
import React from 'react';

export const ExampleComponent6 = () => {
  const t = useTranslator();

  return (
    <Content layoutBehaviour={LayoutBehaviour.FLEX} contentElements={[]}>
      <div className={'grid grid-nogutter'} style={{ width: '100%' }}>
        <ContentCell colWidth={12} paddings={CellPaddings.FULL}>
          <h3>
            {' '}
            {t('Example_component_with_contentcell')}
            <br />
            {t('No_contentbar_elements')}
          </h3>
        </ContentCell>
      </div>
    </Content>
  );
};
