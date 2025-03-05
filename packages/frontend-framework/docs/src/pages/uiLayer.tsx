import React from "react";
import Page from "../components/page/page.tsx";
import Title from "../components/page/text/title.tsx";
import SubTitle from "../components/page/text/subTitle.tsx";
import Typography from "../components/page/utils/typography.tsx";
import Code from "../components/page/utils/code.tsx";
import SubSubTitle from "../components/page/text/subSubTitle.tsx";

const UILayer: React.FC = () => {

    return (
        <Page>
            <Title>UILayer: Navigation and Content Area Elements</Title>
            <SubTitle>Introduction</SubTitle>
            <Typography variant={"p"}>
                The UILayer provides the UI components and some basic logic for the
                application. The UILayer has the following properties, some of them are
                explained later on:
            </Typography>
            <Typography variant={"p"}>
                Interface UILayer
            </Typography>
            <Code language={"typescript"}>
                {`export interface Props {
    tabAndContentWrappers: TabAndContentWrapper[]; // Mandatory: Array of BasicContentWrappers and groups (or other wrappers) to provide in order to render tabs in the navigation bar and the associated component. This is explained in the following sections.
    startingPoint: string; // Mandatory: This is the "entry URL" of your application. The user will be redirected to this URL after successful authentication.
    settingsMenuOptions?: SettingsMenuOptions; // Optional object to configure the settings menu. The object will be explained later in this chapter.
    userMenuOptions?: // Optional object to configure the user menu. The object will be explained later in this chapter.
    authenticationView?: React.ComponentType<AuthenticationViewProps & any>; // Optional property to set a custom authentication view.
    documentsComponent?: React.ComponentType<any>; // Optional property to replace the default imprint with a custom component. This allows you to display a customized list of legal documents.
    headerOptions?: HeaderOptions; // Optional property to customize the header of the main view and the authentication view. The object will be explained later in this chapter.
    authOptions?: AuthOptions;  // Optional property to customize the authentication view. The object will be explained later in this chapter.
    documentsLabelKey?: string; // Optional parameter to replace the text for the legal documents which is shown when hovering over the info icon inside the authentication view and at the bottom of the navigation bar. You have to pass a string which is the key of corresponding translations in your translation files.
    hideLegalDocuments?: boolean; // Option to hide the link for the legal documents. This could be of use if you develop a desktop application like electron.
    navbarOptions?: NavbarOptions; // Option to configure the navigation bar. This is explained later.
    disableCookieBanner?: boolean; // Option to disable / hide the provided cookie banner / disclaimer.
    disableLogin?: boolean; // Option to disable the login and logout.
}`}
            </Code>
            <SubTitle>TabAndContentWrappers: Navigation tabs and content</SubTitle>
            <Typography variant={"p"}>
                A core feature of the framework is the navigation bar and the automatic
                rendering of content when a navigation tab is selected.
            </Typography>
            <Typography variant={"p"}>
                The framework provides two tab components which can be rendered in the
                navigation bar. However, you are able to implement custom navigation tabs.
                All navigation tabs have to have the properties of the following
                interface:
            </Typography>
            <Code language={"typescript"}>
                {`export interface NavbarTabProps<OptionType> {
    name: string | ((t: TranslateFunctionType) => string);
    disabled: boolean;
    frameworkInjectedOptions: OptionType; // These are options which are injected to a navigation tab component by the framework. You will understand how to use it by reading the following content of this section.
    hidden?: boolean; // Option to hide the navigation tab.
    icon?: ReactElement;
    collapsed?: boolean;
    active?: boolean;
}`}
            </Code>
            <Typography variant={"p"}>
                The main navigation tab component provided by the framework is
                SimpleNavbarTab. This is the simplest and most used navigation tab
                component. It&#39;s properties are just the navbarTabProps interface. The
                second navigation tab component is the PrivilegedNavbarTab component. This
                component allows acces if the user belongs to the passed array of groups.
                The user&#39;s group is retrieved using the authentication provider.
                PrivilegedNavbarTab has the properties of navbarTabprops and extends them
                by the following interface:
            </Typography>
            <Code language={"typescript"}>
                {`interface Props {
    permittedGroups: string[]; // Mandatory array of groups which should have access to the content associated with this navigation tab.
}`}
            </Code>
            <SubSubTitle>Implementing custom navigation tabs</SubSubTitle>
            <Typography variant={"p"}>
                To implement custom navigation tabs you should follow the structure of the
                following code snippet:
            </Typography>
            <Typography variant={"p"}>
                PrivilegedNavbarTab
            </Typography>
            <Code language={"typescript"}>
                {`// Properties which should be added to the properties of the  navbarTabProps interface.
export interface Props {
    permittedGroups: string[];
}

export const PrivilegedNavbarTab: GroupableNavbarTab<Props> = (props) => {
    const authContext = useContext(AuthContext);
    const permitted = containsOneOrMoreGroups(
        authContext?.getUserGroups(),
        props.permittedGroups
    );
    return permitted ? (
        <SimpleNavbarTab
            icon={props.icon}
            disabled={props.disabled}
            name={props.name}
            frameworkInjectedOptions={props.frameworkInjectedOptions}
         />
    ) : (
        <></>
    );
};`}
            </Code>
            <Typography variant={"p"}>
                As you may have noticed PrivilegedNavbarTab is of type
                GroupableNavbarTab&lt;Props&gt;. The result of this is that
                PrivilegedNavbarTab has all the properties of the interface NavbarTabProps
                and additionally all properties of the interface Props. This is because
                the navbarTab type is defined as follows:
            </Typography>
            <Typography variant={"p"}>
                navbarTab interface
            </Typography>
            <Code language={"typescript"}>
                {`export type GroupableNavbarTab<additional = {}> = React.FunctionComponent<
    NavbarTabProps<InjectedOptionsGroupableByWrapperToTab> & additional
 >;`}
            </Code>
            <Typography variant={"p"}>
                Furthermore, you may have noticed that the SimpleNavbarTab component is
                reused and <em>frameworkInjectedOptions</em> is passed to the component.
                If you implement your component in this way there is nothing more you have
                to do regarding <em>frameworkInjectedOptions</em>. However, if you want to
                implement your component without using SimpleNavbarTab you should do
                research on the use of <em>frameworkInjectedOptions</em> in
                SimpleNavbarTab. Additionally you will have to implement a factory for
                your navigation tab component. You will understand why in the following
                section. To implement such a factory you can examine the ones provided by
                the Framework.
            </Typography>
            <SubSubTitle>Using navigation tab components</SubSubTitle>
            <Typography variant={"p"}>
                You&#39;ve learned how to use existing navigation tabs and how to develop
                custom ones. But how do you pass navigation tabs to the framework and
                connect them to a specific component for the content area which should be
                rendered if the tab is selected?
            </Typography>
            <Typography variant={"p"}>
                For this purpose the framework provides the wrapper class
                <em>BasicContentWrapper</em>. It wrapps a factory for the element which is
                rendered in the navigation bar (the navigation tab) and the component
                which is rendered in the content area. By wrapping these two elements
                inside an instance of BasicContentWrapper the framework is able to assign
                each navigation tab to a content area element. In order to specify all
                your navigation tabs and the corresponding content area elements you have
                to
                <strong>create an array of instances of this BasicContentWrapper</strong>.
                The class has the following parameters:
            </Typography>
            <Code language={"typescript"}>
                {`constructor(
    protected _path: string,                                            // URL for which the content area element will be rendered -> dont use "/" as route!
    protected _navbarTab: ComponentTypeMinProps<
        InjectedOptionsObject<InjectedOptionsGroupableByWrapperToTab>
    >,                                                                   // Component of the navigation tab (you will have to generate it as shown later by using a factory).
    protected _component: React.ComponentType                           // The element which will be rendered inside the content area.
)`}
            </Code>
            <Typography variant={"p"}>
                Furthermore, the framework provides the <em>Group</em> wrapper class. This
                class allows you to specify groups of navigation tabs with a specified
                label. To create a group you have to pass the corresponding array of
                BasicContentWrapper instances to the Group instance as a parameter. The
                Group class has the following parameters:
            </Typography>
            <Typography variant={"p"}>
                <strong>GroupObject constructor</strong>
            </Typography>
            <Code language={"typescript"}>
                {`constructor(
    private _name: string | ((t: TranslateFunctionType) => string), // Mandatory property that defines the name of the tab.
    private _logo: ReactElement, // Property to set the icon. Ensure to fit the requirements described below.
    private _collapsible: boolean, // Property that defines if the group should be collapsible.
    private _contentWrappers: TabAndContentWrapper[] // Array which contains all BasicContentWrapper instances which are part of the group.
)`}
            </Code>
            <Typography variant={"p"}>
                As you may have noticed the name attribute can be of type string or a
                function which takes a translation function and returns a string. The
                purpose of this is to let you translate group names as easy as possible.
                The following code snippet contains an example of this.
            </Typography>
            <Typography variant={"p"}>
                Furthermore, you have to use svgs as icons so that the dark mode works.
                The &quot;fill&quot; property within the svg should be set to
                &quot;current&quot;. The color of the svg will be set programatically.
            </Typography>
            <Typography variant={"p"}>
                The following code snippet shows an example for defining navigation tabs,
                a group and the corresponding content:
            </Typography>
            <Typography variant={"p"}>
                <strong>Example Navbartab Array</strong>
            </Typography>
            <Code language={"typescript"}>
                {`import { ReactComponent as InfoIcon } from './assets/infoIcon.svg'; // Import .svg icons as React Components -> For issues in combination with vite see the FAQ section

const views = [
    new BasicContentWrapper(
        "/example1/",
    // Pass a SimpleNavbarTab, PrivilegedNavbarTab or a custom NavbarTab element.
        simpleNavbarTabFactory({
            disabled: false,
            name: "Example without Translation"
        }),
        ExampleComponent1 // This component of your own will be rendered if the corresponding navigation tab is selected.
    ),

    new Group(
        (t: TranslateFunctionType) => t('Test_group_not_collapsible'),
        <InfoIcon />,
        false,
        [
            new BasicContentWrapper(
                "/group-example1/",
                simpleNavbarTabFactory({
                    name: (t: TranslateFunctionType) => t("example_component"),
                    disabled: false,
                    icon: <InfoIcon />
                }),
                ExampleComponent2
            )
        ]
    ),
];`}
            </Code>
            <Typography variant={"p"}>
                You may have noticed the use of factories. The framework provides two
                factories: One for SimpleNavbarTab, one for PrivilegedNavbarTab. These are
                simpleNavbarTabFactory and privilegedNavbarTabFactory. You have to pass
                them the properties which will be passed to the navigation tab component
                (for example SimpleNavbarTab) itself.
            </Typography>
            <SubSubTitle>Icons</SubSubTitle>
            <Typography variant={"p"}>
                Please make sure that the .svg icons fit the following structure. The
                colors of the .svg icons are set programmatically from the framework.
                Because of this the property &quot;fill&quot;, which represents the color
                has to be set to the value &quot;current&quot;. The width and height of
                the icons should be set to 24px. The following code snippet shows an
                example svg element.
            </Typography>
            <Typography variant={"p"}>
                <strong>hint1:</strong> We recommend to use the UI/UX Tool Figma for
                Prototyping. Figma offers the functionality to export icons. The framework
                supports the exported figma icons after the setting of the
                &quot;current&quot; value in svg files.
            </Typography>
            <Typography variant={"p"}>
                <strong>hint2:</strong> If you encounter issues to import SVGs as
                ReactComponents while using vite, see the FAQ section.
            </Typography>
            <Typography variant={"p"}>
                <em>*Examplefile of an .svg</em>
            </Typography>
            <Code language={"typescript"}>
                {`<svg id="info-icon" fill="current" data-name="info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <rect id="Rechteck_308" data-name="Rechteck 308" width="24" height="24" fill="none"/>
    <path id="info_FILL0_wght300_GRAD0_opsz24" d="M11.25,16.75h1.5V11h-1.5ZM12,9.3a.757.757,0,0,0,.575-.238.82.82,0,0,0,.225-.587.792.792,0,0,0-.225-.563.816.816,0,0,0-1.15,0,.792.792,0,0,0-.225.563.82.82,0,0,0,.225.587A.757.757,0,0,0,12,9.3Zm0,12.2a9.263,9.263,0,0,1-3.712-.75A9.432,9.432,0,0,1,3.25,15.712a9.563,9.563,0,0,1,0-7.425A9.435,9.435,0,0,1,8.288,3.25a9.563,9.563,0,0,1,7.425,0A9.437,9.437,0,0,1,20.75,8.287a9.563,9.563,0,0,1,0,7.425,9.435,9.435,0,0,1-5.037,5.038A9.27,9.27,0,0,1,12,21.5ZM12,20a7.721,7.721,0,0,0,5.675-2.325A7.721,7.721,0,0,0,20,12a7.721,7.721,0,0,0-2.325-5.675A7.721,7.721,0,0,0,12,4,7.721,7.721,0,0,0,6.325,6.325,7.721,7.721,0,0,0,4,12a7.721,7.721,0,0,0,2.325,5.675A7.721,7.721,0,0,0,12,20ZM12,12Z" transform="translate(-0.5 0.5)" fill="current"/>
</svg>`}
            </Code>
            <SubTitle>Interfaces</SubTitle>
            <SubSubTitle>SettingsMenuOptions: How to configure the settings menu?</SubSubTitle>
            <Typography variant={"p"}>
                These options (property of the UILayer component) allow you to configure
                the settings menu.
            </Typography>
            <Typography variant={"p"}>
                <strong>SettingsMenuOptions</strong>
            </Typography>
            <Code language={"typescript"}>
                {`interface SettingsMenuOptions {
    additionalItems?: MenuItem[]; // Additional menu items (defined as desribed in the PrimeReact menu documentation) to be rendered inside the settings menu.
    hideLanguageSelection?: boolean; // Option to hide the selection of languages.
    hideColorThemeToggler?: boolean; // Option to hide the toggle component for changing the theme (light and dark mode).
}`}
            </Code>
            <SubSubTitle>UserMenuOptions: How to configure the user menu?</SubSubTitle>
            <Code language={"typescript"}>
                {`export interface UserMenuOptions {
    hideLogoutButton?: boolean; // Option to hide the logout button.
    additionalItems?: MenuItem[]; // Additional user menu items (defined as desribed in the PrimeReact menu documentation) to be rendered inside the settings menu.
}`}
            </Code>
            <SubSubTitle>HeaderOptions: How to configure the header?</SubSubTitle>
            <Typography variant={"p"}>
                These options (property of the UILayer component) allow you to configure
                the header of the main view. Note, that since Version 12.0.2 there is no
                default IAV-Company-Logo set, due to legal requirements, as the IAV
                Frontend Framework will be Open Source.
            </Typography>
            <Typography variant={"p"}>
                <strong>Interface HeaderOptions</strong>
            </Typography>
            <Code language={"typescript"}>
                {`interface HeaderOptions {
    reactElementRight?: ReactElement; // Using this option you can set a custom react element with your logo (200x56 pixels).
    reactElementLeft?: ReactElement;// Using this option you can set a custom react element with your logo (420x56 pixels).
    hideLeft?: boolean; // Using this option you can hide the left application logo.
    hideRight?: boolean; // Using this option you can hide the right company logo.
    hideUserIcon?: boolean; // Using this option you can hide the user icon inside the header.
    headerElements?: ReactElement[]; // User can add their own elements to the header
}`}
            </Code>
            <Typography variant={"p"}>
                If the user wants to add their own elements in the header, they can either
                use their own React elements or fall back on the
                <strong>HeaderMenuElement</strong> for a menu or
                <strong>HeaderPanelElement</strong> for an overlay panel provided by the
                IAV Frontend Framework.
            </Typography>
            <SubSubTitle>AuthOptions: How to configure the authentication view?</SubSubTitle>
            <Typography variant={"p"}>
                These options (property of the UILayer component) allow you to configure
                the authentication view.
            </Typography>
            <Typography variant={"p"}>
                <strong>Interface AuthOptions</strong>
            </Typography>
            <Code language={"typescript"}>
                {`interface AuthOptions {
    backgroundImage?: string; // Optional parameter to set the backgroundimag. Ensure to import images using ES6 syntax like this: import applogo from './assets/App-Logo.png';
    companyText?: string; // Optional parameter to set the company's name for the copyright at the front.  
    preventDarkmode?: boolean; // Optional parameter to hide the button for toggling between dark and light mode inside the authentication view.
}

export interface AuthenticationViewProps {
    authOptions?: {
        backgroundImage?: string;
        companyText?: string;
        documentsLabelKey?: string;
        preventDarkmode?: boolean;
    };
    headerOptions?: {
        reactElementLeft?: ReactElement;
        reactElementRight?: ReactElement;
        hideLeft?: boolean;
        hideRight?: boolean;
    };
    hideLanguageSelection?: boolean;
    hideLegalDocuments?: boolean;
}`}
            </Code>
            <SubSubTitle>NavbarOptions: How to configure the navigation bar?</SubSubTitle>
            <Code language={"typescript"}>
                {`export interface NavbarOptions {
    staticCollapsedState?: StaticCollapsedState; // Option to disable the feature to collapse the navigation bar. By setting a value of the StaticCollapsedState you set the navigation bar into a static state in which it is either collapsed or unfolded.
}

enum StaticCollapsedState {
    Collapsed,
    Unfolded
}`}
            </Code>
        </Page>
    )
};

export default UILayer;