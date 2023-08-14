import { useTranslator } from 'iav-frontend-framework/translators';

export const ExampleComponent4 = () => {
  const t = useTranslator();
  return (
    <div>
      <span>{t('basic_div_tag_with_text')}</span>
    </div>
  );
};
