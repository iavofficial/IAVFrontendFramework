import { Content, LayoutBehaviour } from 'iav-frontend-framework/content';
import { CellPaddings, ContentCell } from 'iav-frontend-framework/contentCell';
import { useTranslator } from 'iav-frontend-framework/translators';

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
