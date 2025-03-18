import Page from "../../../common/page/page";
import Title from "../../../common/page/text/title";
import Text from "../../../common/page/text/text";
import SubTitle from "../../../common/page/text/subTitle";
import Table from "../../../common/page/utils/table";
import {
    MODULE_STATE_TABLE_COLUMNS,
    MODULE_THUNKS_TABLE_COLUMNS,
} from "../../../common/page/text/module/moduleTableColumns";
import Code from "../../../common/page/utils/code";

export const PageGeneralAuthModule = () => {
    return (
        <Page>
            <Title>General structure of an authentication module</Title>
            <Text>
                This page describes the general structure of an authentication module.
                Every authentication module has to provide the listed state values and
                methods.
            </Text>

            <SubTitle>Necessary state</SubTitle>
            <Table
                columns={MODULE_STATE_TABLE_COLUMNS}
                data={[
                    {
                        name: "hasAuthenticated",
                        type: "boolean",
                        description: "Defines whether the user is authenticated.",
                    },
                    {
                        name: "isLoading",
                        type: "boolean",
                        description: `Defines whether the authentication process is ongoing.
            (This is a dummy since no real authentication is done.)`,
                    },
                    {
                        name: "userData",
                        type: "UserData | undefined",
                        description: `Contains the user information (for this module only the
            user name) when signed in.`,
                    },
                ]}
            />

            <SubTitle>Necessary Thunks (methods)</SubTitle>
            <Table
                columns={MODULE_THUNKS_TABLE_COLUMNS}
                data={[
                    {
                        name: "fetchAuthed",
                        parameters: CodeFetchAuthedParams,
                        return_type: "Response (from fetch API)",
                        description: `This method should execute a fetch and retry if it fails
            (for example because of a need for token refresh.)`,
                    },
                    {
                        name: "login",
                        parameters: CodeLoginParams,
                        return_type: "void",
                        description: `This method should execute a login process based on the
            passed credentials.`,
                    },
                    {
                        name: "logout",
                        parameters: CodeLogoutParams,
                        return_type: "void",
                        description: `This method should execute the logout process.`,
                    },
                ]}
            />
        </Page>
    );
};

const CodeFetchAuthedParams = (
    <Code language="ts">{`{url: string; settings?: object}`}</Code>
);
const CodeLoginParams = (
    <Code language="ts">{`{credentials: Credentials}`}</Code>
);
const CodeLogoutParams = (
    <Code language="ts">{`{error?: unknown} | undefined`}</Code>
);
