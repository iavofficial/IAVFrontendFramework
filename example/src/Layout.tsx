import {SelectButton} from "primereact/selectbutton";
import {useMemo, useState} from "react";
import {UILayer} from "iav-frontend-framework/uiLayer";
import {TranslateFunctionType} from "iav-frontend-framework/translationFunction";
import {BasicAuthenticationView} from "iav-frontend-framework/basicAuthenticationView";
import {BasicContentWrapper} from "iav-frontend-framework/basicContentWrapper";
import {Group} from "iav-frontend-framework/group";
import InfoIcon from "./assets/infoIcon.tsx";
import {LegalDocuments} from "./components/legalDocuments";
import {ExampleComponent1} from "./components/exampleComponent1";
import {ExampleComponent6} from "./components/exampleComponent6";
import {ExampleComponent3} from "./components/exampleComponent3";
import {ExampleComponent4} from "./components/exampleComponent4";
import {ExampleComponent5} from "./components/exampleComponent5";
import {simpleNavbarTabFactory} from "iav-frontend-framework/simpleNavbarTabFactory";
import {privilegedNavbarTabFactory} from "iav-frontend-framework/privilegedNavbarTabFactory";
import {ExampleComponent2} from "./components/exampleComponent2";
import {PrimeIcons} from "primereact/api";
import {HeaderElement} from "iav-frontend-framework/header";

function Layout() {
    const [selectedButtonOption, setSelectedButtonOption] = useState("Simulated");

    const settingsMenuOptions = {
        additionalItems: [
            {
                template: (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <SelectButton
                            options={["Simulated", "Real"]}
                            value={selectedButtonOption}
                            onChange={(ev) => setSelectedButtonOption(ev.value)}
                        />
                    </div>
                ),
            },
        ],
    };

    const views = [
        new BasicContentWrapper(
            "/example1/",
            simpleNavbarTabFactory({
                disabled: false,
                name: "Example without Translation",
                icon: <InfoIcon />,
            }),
            ExampleComponent1
        ),
        new Group(
            (t: TranslateFunctionType) => t("Test_group_not_collapsible"),
            <InfoIcon />,
            false,
            [
                new BasicContentWrapper(
                    "/group-example2/",
                    simpleNavbarTabFactory({
                        name: (t: TranslateFunctionType) =>
                            t("example_component", { count: 2 }),
                        disabled: false,
                        icon: <InfoIcon />,
                    }),
                    ExampleComponent2
                ),
            ]
        ),
        new BasicContentWrapper(
            "/group-example3/",
            privilegedNavbarTabFactory({
                name: (t: TranslateFunctionType) =>
                    t("example_component", { count: 3 }),
                disabled: false,
                permittedGroups: ["ADMIN"],
                icon: <InfoIcon />,
            }),
            ExampleComponent3
        ),
        new BasicContentWrapper(
            "/group-example4/",
            simpleNavbarTabFactory({
                name: (t: TranslateFunctionType) =>
                    t("example_component", { count: 4 }),
                disabled: false,
                icon: <InfoIcon />,
            }),
            ExampleComponent4
        ),
        new Group(
            (t: TranslateFunctionType) => t("Test_group_collapsible"),
            <InfoIcon />,
            true,
            [
                new Group("Untergruppe", <InfoIcon />, true, [
                    new BasicContentWrapper(
                        "/group-example51/",
                        simpleNavbarTabFactory({
                            name: (t: TranslateFunctionType) =>
                                t("example_component", { count: 5.1 }),
                            disabled: false,
                            icon: <InfoIcon />,
                        }),
                        ExampleComponent3
                    ),
                ]),
                new BasicContentWrapper(
                    "/group-example52/",
                    simpleNavbarTabFactory({
                        name: (t: TranslateFunctionType) =>
                            t("example_component", { count: 5.2 }),
                        disabled: false,
                        icon: <InfoIcon />,
                    }),
                    ExampleComponent4
                ),
                new BasicContentWrapper(
                    "/group-example53/",
                    simpleNavbarTabFactory({
                        name: (t: TranslateFunctionType) =>
                            t("example_component", { count: 5.3 }),
                        disabled: true,
                        icon: <InfoIcon />,
                    }),
                    ExampleComponent3
                ),
            ]
        ),
        new BasicContentWrapper(
            "/group-example6/",
            simpleNavbarTabFactory({
                name: (t: TranslateFunctionType) =>
                    t("example_component", { count: 6 }),
                disabled: false,
                icon: <InfoIcon />,
            }),
            ExampleComponent5
        ),
        new BasicContentWrapper(
            "/group-example7/",
            simpleNavbarTabFactory({
                name: (t: TranslateFunctionType) =>
                    t("example_component", { count: 7 }),
                disabled: false,
                icon: <InfoIcon />,
            }),
            ExampleComponent6
        ),
        new BasicContentWrapper(
            "/nested-route/example1/",
            simpleNavbarTabFactory({
                name: (t: TranslateFunctionType) =>
                    t("example_component", { count: 8 }),
                disabled: false,
                icon: <InfoIcon />,
            }),
            ExampleComponent6
        ),
    ];

    const headerElements: HeaderElement[] = useMemo(() => {
        return [
            {
                icon: PrimeIcons.BELL,
                model: [
                    {
                        template: ExampleComponent4
                    }
                ]
            },
            {
                icon: PrimeIcons.ANGLE_RIGHT,
                model: [
                    {
                        template: ExampleComponent4
                    }
                ]
            }
        ]
    }, [])

    const appLogo = <span className="ml-3">Example application</span>;

    return (
                <UILayer
                    tabAndContentWrappers={views}
                    startingPoint="/example1/"
                    authenticationView={BasicAuthenticationView}
                    settingsMenuOptions={settingsMenuOptions}
                    documentsLabelKey="Legal_documents"
                    documentsComponent={LegalDocuments}
                    headerOptions={{
                        reactElementLeft: appLogo,
                        headerElements: headerElements,
                    }}
                />
    );
}

export default Layout;
