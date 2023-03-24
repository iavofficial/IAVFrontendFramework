import { Imprint } from 'disa-framework/imprint';
import { useTranslator } from 'disa-framework/translators';

export const LegalDocuments = () => {
  const t = useTranslator();

  return (
    <div style={{ height: '100%', width: '100%', overflow: 'auto' }}>
      <div
        className="flex"
        style={{ flexDirection: 'column', justifyContent: 'center' }}
      >
        <div
          style={{
            textAlign: 'center',
            color: 'red',
            fontSize: '25px',
            fontWeight: 'bolder',
          }}
        >
          {t('Customized_legal_documents')}
        </div>
        <Imprint />
        <Imprint />
        <Imprint />
      </div>
    </div>
  );
};
