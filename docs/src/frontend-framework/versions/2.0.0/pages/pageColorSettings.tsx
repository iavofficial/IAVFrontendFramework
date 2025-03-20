/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import Page from "../../../common/page/page.tsx";
import Title from "../../../common/page/text/title.tsx";
import SubTitle from "../../../common/page/text/subTitle.tsx";
import Code from "../../../common/page/utils/code.tsx";
import SubSubTitle from "../../../common/page/text/subSubTitle.tsx";
import Image from "../../../common/page/utils/image.tsx";
import Text from "../../../common/page/text/text.tsx";

const PageColorSettings: React.FC = () => {
    return (
        <Page>
            <Title>Color Settings and Dark Mode</Title>
            <SubTitle>Introduction</SubTitle>
            <Text>
                Color and theme (dark / light mode) information is stored and provided
                by the React context called <strong>ColorSettings</strong>
                context. The ColorSettings context`s provider component is embedded
                inside the ColorProvider component. The ColorProvider itself is
                contained in GlobalDataLayer. Your interface to the ColorProvider
                component is the colorSettings property of the GlobalDataLayer
                component. This property will be explained later on.
            </Text>
            <Text>
                Using these options you are able to set custom colors (especially for
                framework components). Furthermore, the ColorSettings context provides
                you the information whether the dark mode is activated. This allows you
                to implement a dark mode four your components.
            </Text>
            <Text>
                All colors are exported by the framework&#39;s constants file. The
                following code snippet shows you how to import these colors:
            </Text>
            <Code title={"Example exported color"} language={"typescript"}>
                {`import {BLUE0} from "@iavofficial/frontend-framework/constants";`}
            </Code>
            <Title>Overwrite default colors</Title>
            <SubTitle>CSS</SubTitle>
            <Text>
                Besides providing the colors as JS constants, all colors are defined as
                CSS constants within the root and can be used within the css files of
                the project. The following code snippet shows you how to use these
                colors inside css files:
            </Text>
            <Code
                title={"Example exported css constants and variables definition"}
                language={"typescript"}
            >
                {`// Example for exported color by the framework:
:root {
   --blue-0: #001a54;
}

.your-class {
   color: var(--blue-0);
}`}
            </Code>
            <Text>
                The framework provides CSS classes for styling your components. This is
                inspired by PrimeReact. The classes are defined in the globalColors.css
                file and globally exported. The following code snippet illustrates the
                structure of these classe&#39;s names.
            </Text>
            <Code title={"Global CSS colors"} language={"typescript"}>
                {`/* BACKGROUND CLASSES*/
.bg-white-1{ // because of name conflicts with primereact this name is an execption
  background-color: var(--white);
}

.bg-blue-0{
  background-color: var(--blue-0);
}

/* COLOR CLASSES*/
.color-white{
  color: var(--white);
}

.color-blue-0{
  color: var(--blue-0);
}`}
            </Code>
            <SubTitle>colorSettings property of GlobalDataLayer</SubTitle>
            <Text>
                Using the colorSettings property you can pass an object of the following
                structure:
            </Text>
            <Code language={"typescript"}>
                {`export interface ColorProviderProps {
    colorOptions?: ColorOptions; // Options to overwrite the default framework component's default colors.
    disableCustomColorsForLightMode?: boolean; // Option to disable your color settings for the light mode.
    disableCustomColorsForDarkMode?: boolean; // Option to disable your color settings for the dark mode.
}`}
            </Code>
            <Text>
                If you want to overwrite the colors of framework components you can do
                so using GlobalDataLayer&#39;s colorSettings property. The colors should
                be defined in HEX representation. The following code snippet shows the
                options object to overwrite the default colors. The specific interfaces
                are listed later on.
            </Text>
            <Code title={"PageInterface colorObject"} language={"typescript"}>
                {`export interface ColorOptions {
    header?: HeaderColorOptions;
    navbar?: NavbarColorOptions;
    contentArea?: ContentAreaColorOptions;
    contentbar?: ContentbarColorOptions;
    contentCell?: ContentCellColorOptions;
    authenticationView?: AuthenticationViewColorOptions;
}`}
            </Code>
            <Text>
                The following interfaces show that most settings are divided by the
                state of the corresponding element: default, hovering and active.
            </Text>
            <SubSubTitle>Color options of the header</SubSubTitle>
            <Text>
                Using these options you can define the colors of the main view&#39;s
                header.
            </Text>
            <Code title={"PageInterface HeaderColorType"} language={"typescript"}>
                {`export interface HeaderColorOptions {
    backgroundColor?: string;
    settingsIconColor?: string;
    userIconColor?: string;
}`}
            </Code>
            <SubSubTitle>
                Color options of the navigation bar (including the navigation tabs)
            </SubSubTitle>
            <Text>
                Using these options you can define the colors of the main view&#39;s
                navigation bar.
            </Text>
            <Code title={"PageInterface NavbarColorType"} language={"typescript"}>
                {`export interface NavbarColorOptions {
    backgroundColor?: string;
    navbarCollapseArrowColor?: string;
    legalDocumentsIconColor?: string;
    scrollbarColor?: string;
    content?: TabColorOptionsOptional; // Color settings for the navigation tabs
}`}
            </Code>
            <Code language={"typescript"}>
                {`export interface TabColorOptionsOptional {
    insideActiveGroupColor?: string;
    default?: {
        tabBackgroundDefaultColor?: string;
        tabFontDefaultColor?: string;
        tabIconDefaultColor?: string;
        groupBackgroundDefaultColor?: string;
        groupFontDefaultColor?: string;
        groupIconDefaultColor?: string;
        groupArrowDefaultColor?: string;
    };
    hover?: {
        tabBackgroundHoverColor?: string;
        tabFontHoverColor?: string;
        tabIconHoverColor?: string;
        groupBackgroundHoverColor?: string;
        groupFontHoverColor?: string;
        groupIconHoverColor?: string;
        groupArrowHoverColor?: string;
    };
    active?: {
        tabBackgroundActiveColor?: string;
        tabFontActiveColor?: string;
        tabIconActiveColor?: string;
        groupBackgroundActiveColor?: string;
        groupFontActiveColor?: string;
        groupIconActiveColor?: string;
        groupArrowActiveColor?: string;
    };
}`}
            </Code>
            <SubSubTitle>Color options of the content area</SubSubTitle>
            <Text>
                Using these options you can set the colors of the content area:
            </Text>
            <Code title={"ContentColorType"} language={"typescript"}>
                {`export interface ContentAreaColorOptions {
    backgroundColor?: string;
}`}
            </Code>
            <SubSubTitle>
                Color options of the content bar (including tabs)
            </SubSubTitle>
            <Text>
                Using these options you can set the colors of the tabs of the content
                bar:
            </Text>
            <Code title={"ContentbarTabColorOptions"} language={"typescript"}>
                {`export interface ContentbarColorOptions {
    backgroundColor?: string;
    iconDefaultColor?: string;
    iconHoverColor?: string;
    buttonDefaultColor?: string;
    buttonHoverColor?: string;
    tabs?: ContentbarTabColorType; // Color settings of the tabs
}`}
            </Code>
            <Code title={"ContentbarTabColorType"} language={"typescript"}>
                {`export interface ContentbarTabColorType {
    backgroundDefaultColor?: string;
    backgroundHoverColor?: string;
    backgroundActiveColor?: string;
    textDefaultColor?: string;
    textHoverColor?: string;
    textActiveColor?: string;
    iconDefaultColor?: string;
    iconHoverColor?: string;
    iconActiveColor?: string;
}`}
            </Code>
            <SubSubTitle>Color options for content cells</SubSubTitle>
            <Text>Using these options you can set the colors of content cells:</Text>
            <Code language={"typescript"}>
                {`export interface ContentCellColorOptions {
    backgroundColor?: string;
}`}
            </Code>
            <SubSubTitle>Color options for the authentication view</SubSubTitle>
            <Text>
                Using these options you can set the colors of the authentication view:
            </Text>
            <Code title={"Interfaces ContentElements"} language={"typescript"}>
                {`export interface AuthenticationViewColorOptions {
    headerBackgroundColor?: string;
    loginButtonBackgroundColor?: string;
    loginButtonTextColor?: string;
    legalNoticeIconColor?: string;
    loginFormBackgroundColor?: string;
    fullScreenBackgroundColor?: string; // If fullscreenBackgroundcolor is defined, this color will replace the background image inside the authentication view.
    companyTextColor?: string;
    inputFieldDescriptionTextColor?: string;
    inputFieldBackgroundColor?: string;
    inputFieldTextColor?: string;
    passwortRequirementsTextColor?: string; // Defines the color of the text for the requirements to set a new password of the AWS authentication view.
    themeTogglerColor?: string;
}
export interface AuthenticationColorType {
    headerBackgroundColor?: string;
    loginButtonBackgroundColor?: string;
    loginButtonTextColor?: string;
    legalNoticeIconColor?: string;
    loginFormBackgroundColor?: string;
    fullScreenBackgroundColor?: string;
    companyTextColor?: string;
    inputFieldDescriptionTextColor?: string;
    inputFieldBackgroundColor?: string;
    inputFieldTextColor?: string;
    passwortRequirementsTextColor?: string; // Defines the color of the text for the requirements to set a new password of the AWS authentication view.
}`}
            </Code>
            <Title>Other color options</Title>
            <Text>
                To change the color of the PrimeReact components DropDown and
                ContextMenu you have to overwrite the following css variables:
            </Text>
            <Code title={"CSS Properties"} language={"css"}>
                {`:root {
    --contextmenubgmaincolor: ... // Background color of the contextsubmenu (settingsmenu and loginmenu).
    --highlightcolor: ... // Background color of the contextsubmenu if hovered or selected (settingsmenu and loginmenu).
    --textAndIconMainColor: ... // Main text and icon color.
    --textAndIconHighlightColor: ... // Text and icon color if hovered or selected.
    --dropdownBg: ... // Background of the DropDown component.
    --dropdownBgHighlight: ... // Color of the texts highlighting if hovered of selected.
}`}
            </Code>
            <Title>Example for using custom colors</Title>
            <Text>
                Using these options you can for example create a view like the
                following.
            </Text>
            <Image src={"assets/color-settings/custom-coloring.png"} fromGhPages/>
            <Title>How to implement a dark mode in custom components</Title>
            <SubTitle>Implement dark mode using the ColorSettings context</SubTitle>
            <Text>
                If you want to implement a component including a dark mode you will have
                to know whether the dark mode is activated at first. You are able to get
                this information by reading the darkmode attribute of the ColorSettings
                context. The following code snippet shows an example:
            </Text>
            <Code title={"Interfaces ContentElements"} language={"typescript"}>
                {`import React, { useContext } from 'react';
import { ColorSettingsContext } from 'disa-framework/colorSettingsContext';
import '@iavofficial/frontend-framework/globalColors.css';

export const ExampleComponent = () => {
    const colorSettingsContext = useContext(ColorSettingsContext);

    return (
        <div style={{ width: '100%' }}
            className={colorSettingsContext?.darkmode ? 'color-white bg-black' : 'color-black bg-white'}>
            ExampleComponent
        </div>
    );
};`}
            </Code>
            <Text>
                However, deciding which colors should be used regarding the theme inside
                your components is a bad practice. Instead you should maintain the
                currently used colors in a central place like the framework does.
                Consult the framework implementation (especially the ColorProvider
                component) for further details.
            </Text>
            <SubSubTitle>
                Implement dark mode using the color-theme html attribute
            </SubSubTitle>
            <Text>
                If the user activates the dark mode the &quot;color-theme&quot; html
                attribute will be set (at html body). This enables you to style your
                components for the light and dark mode using CSS attribute selectors
                like so:
            </Text>
            <Code language={"typescript"}>
                {`.example {
    background-color: white;
}

[color-theme="dark"] .example {
    background-color: black;
}`}
            </Code>
            <Text>
                This CSS will set a white background for the class &quot;example&quot;
                if the color-theme is not &quot;dark&quot; (light mode is activated). If
                the color-theme is set to &quot;dark&quot; (dark mode is activated) it
                will set the background to black.
            </Text>
            <Title>How to disable the dark mode</Title>
            <Text>
                To disable the dark mode use the <em>hideColorThemeToggler</em> option
                inside <em>settingsMenuOptions</em>
                of the UILayer component. This will prevent the user from changing the
                theme.
            </Text>
        </Page>
    );
};

export default PageColorSettings;

