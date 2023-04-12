import { useTranslator } from 'disa-framework/translators';
import { ImprintText } from 'disa-framework/imprint';
import { useContext } from 'react';
import { ColorSettingsContext } from 'disa-framework/colorSettingsContext';
import 'disa-framework/globalColors.css';

export const LegalDocuments = () => {
  const t = useTranslator();
  const colorSettingsContext = useContext(ColorSettingsContext);

  return (
    <div
      className={
        (colorSettingsContext?.darkmode ? 'bg-black' : 'bg-grey-1') + ' p-3'
      }
      style={{ height: '100%', width: '100%', overflow: 'auto' }}
    >
      <div
        className={
          (colorSettingsContext?.darkmode ? 'bg-grey-5' : 'bg-white') +
          ' flex px-3'
        }
        style={{
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          overflow: 'auto',
        }}
      >
        <div
          className={
            colorSettingsContext?.darkmode ? 'color-blue-3' : 'color-red'
          }
          style={{
            textAlign: 'center',
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
