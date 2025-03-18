import Page from "../../../common/page/page";
import {
    MODULE_COMPONENT_TABLE_COLUMNS,
    MODULE_METHOD_TABLE_COLUMNS,
} from "../../../common/page/text/module/moduleTableColumns";
import SubTitle from "../../../common/page/text/subTitle";
import Text from "../../../common/page/text/text";
import Title from "../../../common/page/text/title";
import Code from "../../../common/page/utils/code";
import Table from "../../../common/page/utils/table";

export const PageGeneralRouterModule = () => (
    <Page>
        <Title>General structure of a router module</Title>
        <Text>
            This page describes the general structure of a router module. Since the
            default router module has no global state there is no necessary state.
        </Text>
        <SubTitle>Necessary components</SubTitle>
        <Text>
            A router module has to provide the following components. For more
            information consult the types and default implementation inside the{" "}
            package <i>shared</i>.
        </Text>
        <Table
            columns={MODULE_COMPONENT_TABLE_COLUMNS}
            data={[
                {
                    name: "UiLayerRouter",
                    component_type: CodeUiLayerRouterType,
                    description: `This component gets rendered inside the UILayer and has
          to implement the routing for the passed parameters.`,
                },
                {
                    name: "MainViewRouter",
                    component_type: CodeMainViewRouterType,
                    description: `This component gets rendered inside the MainView component
          and has to implement the routing for the passed routes.`,
                },
                {
                    name: "Link",
                    component_type: CodeLinkType,
                    description: `This component has to trigger a "load" of the passed
          link. Optionally a target like "_blank" can be passed.`,
                },
            ]}
        />

        <SubTitle>Necessary methods</SubTitle>
        <Table
            columns={MODULE_METHOD_TABLE_COLUMNS}
            data={[
                {
                    name: "useLocation",
                    type: CodeUseLocationType,
                    description: `This Hook has to return the current location as a string
          (inside an object).`,
                },
                {
                    name: "useIsTabActive",
                    type: CodeUseIsActiveType,
                    description: `This Hook has to return if the tab corresponding to the
          path is active (inside an object).`,
                },
            ]}
        />

        <SubTitle>Other important types</SubTitle>
        <Code language="ts">{`export type BasicRoute = {
  path: string;
  element: ReactElement;
  disabled?: boolean;
  key?: string;
} & Record<string, unknown>;`}</Code>
    </Page>
);

const CodeUiLayerRouterType = (
    <Code language="ts">{`React.ComponentType<{
      routes: BasicRoute[];
      initialPath: string;
      disableLogin: boolean;
  }>`}</Code>
);
const CodeMainViewRouterType = (
    <Code language="ts">{`React.ComponentType<{
      routes: BasicRoute[];
  }>`}</Code>
);
const CodeLinkType = (
    <Code language="ts">{`React.ComponentType<
      PropsWithChildren<
          {
              to: string;
              style: Record<string, unknown>;
              target?: string;
          } & Record<string, unknown>;
      >
  >`}</Code>
);

const CodeUseLocationType = (
    <Code language="ts">{`() => {pathName: string}`}</Code>
);

const CodeUseIsActiveType = (
    <Code language="ts">{`(tabPath: string) => {isActive: boolean}`}</Code>
);
