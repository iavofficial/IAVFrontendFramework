import React from "react";
import Page from "../../../common/page/page.tsx";
import Title from "../../../common/page/text/title.tsx";
import SubTitle from "../../../common/page/text/subTitle.tsx";
import SubSubTitle from "../../../common/page/text/subSubTitle.tsx";
import Code from "../../../common/page/utils/code.tsx";
import BulletList from "../../../common/page/text/bulletList.tsx";
import Image from "../../../common/page/utils/image.tsx";
import Text from "../../../common/page/text/text.tsx";


const ContentArea: React.FC = () => {

    return (
        <Page>
            <Title>Content Area</Title>
            <SubTitle>Style, Layout and embedding the Content Bar</SubTitle>
            <Text>
                As shown in UILayer you are free to pass every component for the content
                area. However, the framework provides three higher order components for
                your content area components. Their purposes are styling (ContentStyle),
                layout (ContentLayout) and embedding the content bar (ContentWithBar). If
                you use ContentLayout, ContentStyle will be applied automatically. If you
                use ContentWithBar, ContentLayout (and because of this also ContentStyle)
                will be applied.
            </Text>
            <SubSubTitle>The ContentStyle component</SubSubTitle>
            <Text>
                The ContentStyle components adds the current background color and other
                styles to your content area component. This allows you to easily embed a
                frame (in light mode it is grey, as shown in some screenshots in this
                documentation) for your content area component. ContentStyle has the
                following properties:
            </Text>
            <Code language={"language"}>
                {`export interface ContentStyleProps {
    appliedStyles?: StylesArray<typeof ContentStyleStyles>;
}`}
            </Code>
            <Text>
                This means that you are able to pass an array of predefined styles to the
                component which should be activated. The predefined styles are the
                following:
            </Text>
            <Code language={"language"}>
                {`export const ContentStyleStyles = {
    WRAPPER_FULL_WIDTH: "WRAPPER_FULL_WIDTH",
    WRAPPER_FULL_HEIGHT: "WRAPPER_FULL_HEIGHT",
    SPACING: "SPACING",
    SET_SPACING_COLOR: "SET_SPACING_COLOR",
};`}
            </Code>
            <Text>
                The framework also exports templates. These are just predefined arrays of
                styles. These are the following:
            </Text>
            <BulletList
                bulletType={"bullet"}
                items={[
                    "DEFAULT: This template should be used for simple content areas (for example it sets a colored gap).",
                    "CONTENT_CELLS: This template should be used if you want to use the ContentCell component."
                ]}/>
            <Code title={"First Example"} language={"typescript"}>
                {`<ContentStyle
    appliedStyles={[ContentStyleStyles.FULL_WIDTH, ContentStyleStyles.SPACING, ContentStyleStyles.SET_SPACING_COLOR]}
/>`}
            </Code>
            <Code title={"Second Example"} language={"typescript"}>
                {`<ContentStyle
    appliedStyles={ContentStyleTemplates.DEFAULT}
/>`}
            </Code>
            <SubSubTitle>The ContentLayout component</SubSubTitle>
            <Text>
                Using the ContentLayout component you are able to specify a content layout
                for your content area component. Furthermore, the ContentLayout component
                uses the ContentStyle component. To use ContentStyle with ContentLayout
                you have to pass an object containing the appliedStyles array to
                ContentLayout.
            </Text>
            <Code language={"typescript"}>
                {`interface Props {
    contentStyle?: ContentStyleProps; // An object of the following format: {appliedStyles: [...]}
    layoutBehaviour?: LayoutBehaviour; // Option to specify the layout which is one option of the following enum.
}`}
            </Code>
            <Text>
                The LayoutBehaviour enum is defined like this:
            </Text>
            <Code language={"typescript"}>
                {`export enum LayoutBehaviour {
    // Parent div of content will have no specific layout class
    NONE = "",
    // Parent div will be PrimeFlex grid
    GRID = "grid grid-nogutter",
    // Parent will be  PrimeFlex flexbox
    FLEX = "flex",
    // Parent will be  PrimeFlex flexbox column
    FLEX_COL = "flex flex-column",
}`}
            </Code>
            <Text>
                The following code block shows an example of using ContentLayout:
            </Text>
            <Code language={"typescript"}>
                {`import { CellPaddings, ContentCell } from '@iavofficial/frontend-framework/contentCell';
import { ContentLayout, LayoutBehaviour } from '@iavofficial/frontend-framework/contentLayout';

export const ExampleComponent = () => {
  return (
    <ContentLayout layoutBehaviour={LayoutBehaviour.GRID} contentStyle={appliedStyles: ContentStyleTemplates.CONTENT_CELLS}>
      <ContentCell colWidth={12} paddings={CellPaddings.FULL}>
        <h1>
          Example component
        </h1>
      </ContentCell>
    </ContentLayout>
  );
};`}
            </Code>
            <Text>
                The ContentCell component will be explained later on.
            </Text>
            <SubSubTitle>The ContentWithBar component</SubSubTitle>
            <Text>
                This HOC can be used for implementing a content area component containing
                a Content Bar. To embed the Content Bar you just have to pass a wrapper
                array containing your components to the ContentWithBar component using
                it`s &quot;contentWrappers&quot; property. The ContentWithBar component
                will render the Content Bar and underneath it will render your content
                area UI which is the child of this component.
            </Text>
            <Text>
                To define the tabs for the Content Bar and the corresponding components
                which will be shown inside the content area, you have to define a wrapper
                object array similarly to the array for the navigation bar. This time you
                have to create an array of instances of the class BasicContentbarWrapper
                or CustomContentbarWrapper. BasicContentbarWrapper renders the simplest
                and mainly used content tab. CustomContentbarWrapper allows you to define
                a custom component which will be rendered inside the content bar. The
                array is then passed to the Content component using the contentWrappers
                property.
            </Text>
            <Text>
                Furthermore, the framework will render buttons for sliding to the left and
                right inside the content bar. While the navigation bar isn&#39;t
                collapsed, this will happen if there are more than 5 elements inside the
                content bar. If the navigation bar is collapsed, the buttons will render
                if there are more than 6 elements in the content bar.
            </Text>
            <Text>
                ContentWithBar uses ContentLayout and ContentStyle. Because of this the
                functionality of these components will be added by default. The following
                code snippet shows the properties of the Content component.
            </Text>
            <Code title={"Interface Content"} language={"typescript"}>
                {`export interface Props {
    contentStyle?: ContentStyleProps; // An object of the following format: {appliedStyles: [...]} 
    layoutBehaviour?: LayoutBehaviour; // Option to specify the layout which is one option of the following enum.
    contentWrappers: BasicContentbarWrapper[] | CustomContentbarWrapper[]; // Array of elements to show inside the content bar.
    selectedId: string; // The id of the currently selected content area component.
    addable?: boolean; // This optional property defines if the add button will be rendered.
    jumpToEndOfBar?: boolean; // Determines if the content bar should set a newly created tab to active.
    onClickAddButton?: () => any; // Using this optional property you can pass a function that will be triggerd if the add button is clicked.
    onClickLeftSlideButton?: () => any; // Using this property you cann pass a function that will be triggerd if the slide left Button is clicked.
    onClickRightSlideButton?: () => any;// Using this property you can pass a function that will be triggerd if the slide right Button is clicked.
}`}
            </Code>
            <Text>
                The following code snippet shows the attributes of the BasicContentbarWrapper class:
            </Text>
            <Code title={"Constructor BasicContentbarWrapper"} language={"typescript"}>
                {`constructor({
    id: string, // Identifier of the tab element.
    displayName: string | TranslationFunction, // Display name of the tab element.
    onClick: (id: string) => any, // Function to set the id of the clicked element.
    contentAreaElement: React.ReactElement // Defines which custom component should be connected with the content bar tab element.
    onClose?: (id: string) => void, // Optional function to handle the deletion of a content tab / contentbar wrapper.
    closable?: boolean, // Property to define if a closing icon will be rendered.
}) {}`}
            </Code>
            <Text>
                The following code snippet shows the attributes of the
                CustomContentbarWrapper class:
            </Text>
            <Code title={"Constructor CustomContentbarWrapper"} language={"typescript"}>
                {`constructor({
  id: string, // Identifier of the tab element
  renderElement: ReactElement, // The custom tab element that should be rendered within the content bar.
  contentAreaElement: React.ReactElement // Defines which custom component should be rendered when selecting a content bar tab.
}) {}`}
            </Code>
            <Text>
                The following code snippet shows an example for creating a component containing a content bar:
            </Text>
            <Code title={"Example Content Component Implementation"} language={"typescript"}>
                {`export const ExampleComponent1 = () => {
  const [selectedId, setSelectedId] = useState<string>(WrapperIds.Test1);

  // Array containing wrapper objects to bind elements to corresponding contentbar tabs.
  let exampleArray = [
    new BasicContentbarWrapper({
      id: WrapperIds.Test1,
      displayName: (t: TranslateFunctionType) => t("component", { count: 1 }),
      closable: false,
      onClick: setSelectedId,
      contentAreaElement: (
        <ContentbarExample
          exampleText={"your_component simple usecase "}
          backgroundColor={GREEN}
          identifierNumber="1"
        />
      ),
    }),
    new BasicContentbarWrapper({
      id: WrapperIds.Test2,
      displayName: (t: TranslateFunctionType) => t("component", { count: 2 }),
      closable: false,
      onClick: setSelectedId,
      contentAreaElement: (
        <ContentbarExample
          exampleText="your_component simple usecase "
          backgroundColor={RED}
          identifierNumber="2"
        />
      ),
    }),
    new BasicContentbarWrapper({
      id: WrapperIds.Test3,
      displayName: (t: TranslateFunctionType) => t("component", { count: 3 }),
      onClick: setSelectedId,
      closable: false,
      contentAreaElement: (
        <ContentbarExample
          exampleText={"your_component simple usecase "}
          backgroundColor={YELLOW}
          identifierNumber="3"
        />
      ),
    }),
  ];

  return (
    <ContentWithBar
      contentWrappers={exampleArray}
      selectedId={selectedId}
      layoutBehaviour={LayoutBehaviour.GRID}
      contentStyle={ContentStyleTemplates.CONTENT_CELLS}
    />
  );
};`}
            </Code>
            <Text>
                <strong>Hint:</strong> see further integration with different use cases and
                React State Management hooks in the Example-Project and TemplateProject
            </Text>
            <SubTitle>ContentCell</SubTitle>
            <Text>
                The framework provides a grid system to structure the content area. For
                this purpose the framework provides the ContentCell component. The
                component has to be embedded inside ContentLayout (or ContentWithBar as it
                uses ContentLayout) with your desired content area layout. The following
                code snippet shows it&#39;s properties.
            </Text>
            <Code title={"Interface ContentCell and CellPaddings ENUM"} language={"typescript"}>
                {`export enum CellPaddings {
  FULL,
  VERT_RIGHT,
  BOT_HOR,
  BOT_RIGHT,
  NONE,
}

export interface Props {
  colWidth?: number; // Set the column width between 1-12 based on PrimeFlex (spacing of PrimeReact).
  clearStyle?: boolean; // Clears the background color of the contentcell.
  paddings: CellPaddings; // Definition of the element's padding.
}`}
            </Code>
            <Text>
                The following code snippet shows an example implementation of a content
                area using the grid system.
            </Text>
            <Text>
                <strong>Important hint:</strong> This component has to be embedded inside
                ContentLayout (or ContentWithBar) with the layout set to GRID.
            </Text>
            <Code title={"Example implementation with the ContentCell components"} language={"typescript"}>
                {`import { ContentCell } from '@iavofficial/frontend-framework/contentCell';
import React from 'react';

export interface Props {
  exampleText: string;
}

export const ContentbarExampleWithText = (props: Props) => {
  return (
    <>
      <div className={'col-8 grid grid-nogutter'}>// the classnames are importend from primereact - feel free use your own styling library instead
        <ContentCell colWidth={6} paddings={CellPaddings.FULL}>
          <span>First row left</span>
          <h2>{props.exampleText}</h2>
          <h3>Contentbar with default tabelements</h3>
          <div></div>
        </ContentCell>
        <ContentCell colWidth={6} paddings={CellPaddings.VERT_RIGHT}>
          <span>First row center</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_HOR}>
          <span>Second row left</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row center left</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row center</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row center right</span>
        </ContentCell>
        <ContentCell paddings={CellPaddings.BOT_RIGHT}>
          <span>Second row right</span>
        </ContentCell>
        <ContentCell colWidth={12} paddings={CellPaddings.BOT_HOR}>
          <span>Third row</span>
        </ContentCell>
      </div>
      <ContentCell
        paddings={CellPaddings.VERT_RIGHT}
        colWidth={4}
        clearStyle={true}
      >
        <span>Right with cleared style</span>
      </ContentCell>
    </>
  );
};`}
            </Code>
            <Text>
                The resulting content area looks like this:
            </Text>
            <Image src={"assets/content-area/content-area.png"} fromGhPages/>
        </Page>
    )
};

export default ContentArea;