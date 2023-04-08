import React, { useContext } from 'react';
import { FirstExampleContext } from '../contexts/FirstExampleContext';
import { Content, LayoutBehaviour } from 'disa-framework/content';
import { useTranslator } from 'disa-framework/translators';

export const ThirdExampleComponent = () => {
  const context = useContext(FirstExampleContext);
  const t = useTranslator();
  return (
    <Content layoutBehaviour={LayoutBehaviour.FLEX} contentElements={[]}>
      <div>
        {t('Example_global_context')}: {context ? context.exampleData : ''}
      </div>
      <div>
        {t('Example_translation')}: {t('Imprint')}
      </div>
      <div>
        {t('Example_pluralization_merging')}:{' '}
        {t('bytes_example', { count: 1024 })}
      </div>
    </Content>
  );
};
