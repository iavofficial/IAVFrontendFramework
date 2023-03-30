import { useTranslator } from 'disa-framework/translators';
import { ImprintText } from 'disa-framework/imprint';

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
        <ImprintText />
      </div>
    </div>
  );
};
