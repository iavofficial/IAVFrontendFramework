import { useTranslator } from 'iav-frontend-framework/translators';
import { BLUE3, WHITE } from 'iav-frontend-framework/constants';
import { Content, LayoutBehaviour } from 'iav-frontend-framework/content';
import { CellPaddings, ContentCell } from 'iav-frontend-framework/contentCell';
import { Button } from 'primereact/button';
import { useState } from 'react';

export const ExampleComponent5 = () => {
  const [translationString, setTranslationString] = useState('');
  const t = useTranslator();

  return (
    <Content layoutBehaviour={LayoutBehaviour.FLEX} contentElements={[]}>
      <div className={'grid grid-nogutter'} style={{ width: '100%' }}>
        <ContentCell colWidth={12} paddings={CellPaddings.FULL}>
          <h1>{t('translation_and_colormode_example')}</h1>
          <h3>{t('with_applied_dark_and_lightMode')}</h3>
          <div className="flex align-items-center">
            <h5 className="m-4">
              {translationString === ''
                ? 'i am not translated'
                : t(translationString)}
            </h5>
            <Button
              onClick={
                translationString === ''
                  ? () => setTranslationString('i_am_translated')
                  : () => setTranslationString('')
              }
              label={translationString === '' ? t('translate') : t('reset')}
              style={{
                width: '150px',
                height: '40px',
                float: 'right',
                border: 'none',
                borderRadius: '8px',
                color: WHITE,
                backgroundColor: BLUE3,
              }}
            />
          </div>
        </ContentCell>
      </div>

      <div
        className="mr-3 mb-3 mt-3"
        style={{ backgroundColor: 'white', width: '100%' }}
      >
        <h3>{t('without_applied_dark_and_lightMode')}</h3>
      </div>
    </Content>
  );
};
