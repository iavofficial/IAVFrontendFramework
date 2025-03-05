import React from "react";
import Page from "../components/page/page.tsx";
import Title from "../components/page/text/title.tsx";
import SubTitle from "../components/page/text/subTitle.tsx";
import Typography from "../components/page/utils/typography.tsx";
import Code from "../components/page/utils/code.tsx";

const GlobalDataLayer: React.FC = () => {

    return (
        <Page>
            <Title>GlobalDataLayer: Internationalization and Authentication system</Title>
            <SubTitle>Internationalization</SubTitle>
            <Typography variant={"p"}>
                The framework uses react-i18next for internationalization and provides a
                default initialization which automatically gets executed when the
                GlobalDataLayer component mounts. It also provides translations in english
                and german for texts of framework components. You are able to extend the
                translations for framework components with other languages by providing
                translations with the translation keys used by the framework&#39;s
                components.
            </Typography>
            <Typography variant={"p"}>
                The GlobalDataLayer component provides the following interface for
                internationalization:
            </Typography>
            <Typography variant={"p"}>
                <strong>Interface GlobalDataLayer</strong>
            </Typography>
            <Code language={"typescript"}>
                {`interface Props {
    languageOptions?: GlobalDataLayerLanguageOptions;
    translations?: Translations;
    initI18Next?: () => void;
    colorSettings?: ColorProviderProps;
}`}
            </Code>
            <Typography variant={"p"}>
                To define and use custom translations you have to define an object of the
                structure seen in the following code snippet. After defining the object
                you have to pass it to GlobalDataLayer.
            </Typography>
            <Typography variant={"p"}>
                <strong>Internationalization Example</strong>
            </Typography>
            <Code language={"typescript"}>
                {`const translations = {
     en: {
         translation: importedJsonFileEnglish
    },
     de: {
         translation: importedJsonFileGerman
     }
}

...
return (
    ...
    <GlobalDataLayer translations={translations}/>
    ...
);`}
            </Code>
            <Typography variant={"p"}>
                The .json files have to include simple key value pairs like this:
            </Typography>
            <Typography variant={"p"}>
                <strong>Language Object Example</strong>
            </Typography>
            <Code language={"json"}>
                {`{
    "optioName": "German",
    "greeting": "hello",
    "promoteProgramming": "Programming is fun!"
}`}
            </Code>
            <Typography variant={"p"}>
                When defining a new language you should define the following translations as the following keys are used
                by the framework's components:
            </Typography>
            <Typography variant={"p"}>
                <strong>Mandatory keys</strong>
            </Typography>
            <Code language={"json"}>
                {`{
    "auth": {
        "invalidAccessConfiguration": "Invalid access configuration",
        "invalidUsernameOrPassword": "Invalid username or password",
        "passwordRequirementsNotMet": "Password did not meet the requirements",
        "serverError": "Server error"
    },
    "form": {
        "emailAddress": "Email address",
        "password": "Password",
        "newPassword": "New password",
        "replaceTemporaryPassword": "Please replace your temporary password with a new one. Your new password has to meet the following requirements:"
    },
    "passwordRequirements": {
        "atLeast8Characters": "At least 8 characters",
        "upperLowerCaseLetters": "Upper & lower cases letters",
        "atLeastOneSpecialCharacter": "At least one special character",
        "atLeastOneDigit": "At least one digit"
    },
    "cookieConsent": {
        "header": "This website uses cookies.",
        "disclaimer": "This website needs you to allow cookies for proper functionality.",
        "allowCookiesButton": "Allow cookies"
    },
    "company": {
        "date": "Date",
        "imprint": "Imprint",
        "germany": "Germany",
        "internet": "Internet",
        "headquarter": "Headquarter",
        "registerCourt": "Register court",
        "registrationNumber": "Registration number",
        "ustIdentNumber": "USt-Ident-Number",
        "managingDirectors": "Managing directors",
        "chairman": "Chairman",
        "chairmanSupervisoryBoard": "Chairman of the supervisory board"
    },
    "settings": {
        "language": "Language"
    }
}`}
            </Code>
        </Page>
    )
};

export default GlobalDataLayer;