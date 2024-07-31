import translationES from "./assets/translations/es.json";
import { GlobalDataLayer } from "iav-frontend-framework/globalDataLayer";
import { DummyAuthenticationProvider } from "iav-frontend-framework/dummyAuthenticationProvider";
import translationEN from "./assets/translations/en.json";
import translationDE from "./assets/translations/de.json";
import translationDECH from "./assets/translations/de-CH.json";
import Layout from "./Layout.tsx";

const App = () => {
  const translations = {
    es: {
      translation: translationES,
    },
    en: {
      translation: translationEN,
    },
    de: {
      translation: translationDE,
    },
    de_CH: {
      translation: translationDECH,
    },
  };

  return (
    <DummyAuthenticationProvider
      additionalContextValues={{ getUserGroups: () => [] }}
    >
      <GlobalDataLayer
        translations={translations}
        colorSettings={{
          colorOptions: {},
        }}
      >
        <Layout />
      </GlobalDataLayer>
    </DummyAuthenticationProvider>
  );
};

export default App;
