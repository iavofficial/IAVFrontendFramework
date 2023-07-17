import { useTranslator } from 'disa-framework/translators';

export const ExampleComponent3 = () => {
  const t = useTranslator();

  return <div>{t('component_deactivated')}</div>;
};
