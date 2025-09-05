import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Space, Tag, Typography } from "antd";
import { useModule } from "@iavofficial/frontend-framework-shared/moduleContext";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework-shared/moduleNames";
import { generateHashOfLength } from "@iavofficial/frontend-framework-shared/hash";
import { CustomContentbarWrapper } from "@iavofficial/frontend-framework/customContentbarWrapper";
import { BasicContentWrapper } from "@iavofficial/frontend-framework/basicContentWrapper";
import { simpleNavbarTabFactory } from "@iavofficial/frontend-framework/simpleNavbarTabFactory";
import InfoIcon from "../../assets/infoIcon.svg?react";
import { ExampleComponent1 } from "../exampleComponent1";
import { ExampleComponent2 } from "../exampleComponent2";
import { ExampleComponent3 } from "../exampleComponent3";
import { ExampleComponent4 } from "../exampleComponent4";
import { ExampleComponent5 } from "../exampleComponent5";
import { ExampleComponent6 } from "../exampleComponent6";
import { ExampleComponent7 } from "../exampleComponent7";
import { ExampleComponent8 } from "../exampleComponent8";
import { ExampleComponent9 } from "../exampleComponent9";
import { ExampleComponent10 } from "../exampleComponent10";

export const ExampleComponentUI: React.FC = () => {
  const ui = useModule(MandatoryModuleNames.UI);
  const Header = ui?.UILayerHeader as React.ComponentType<any> | undefined;
  const Navbar = ui?.UILayerNavbar as React.ComponentType<any> | undefined;
  const ContentWithBar = ui?.UILayerContentWithBar as
    | React.ComponentType<any>
    | undefined;
  const CookieBanner =
    (ui?.UILayerCookieBanner as React.ComponentType<any> | undefined) ??
    (ui?.UILayerCookieBanner as React.ComponentType<any> | undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ui?.extras?.setCollapsible) dispatch(ui.extras.setCollapsible(true));
  }, [dispatch, ui]);

  const navbarItems = useMemo(() => {
    return [
      new BasicContentWrapper(
        "/home",
        simpleNavbarTabFactory({
          name: "Home",
          disabled: false,
          icon: <InfoIcon />,
        }),
        () => null,
      ),
      new BasicContentWrapper(
        "/modules",
        simpleNavbarTabFactory({
          name: "Modules",
          disabled: false,
          icon: <InfoIcon />,
        }),
        () => null,
      ),
      new BasicContentWrapper(
        "/examples",
        simpleNavbarTabFactory({
          name: "Examples",
          disabled: false,
          icon: <InfoIcon />,
        }),
        () => null,
      ),
    ];
  }, []);

  const contentTabs = useMemo(() => {
    const make = (label: React.ReactNode, content: React.ReactNode) =>
      new CustomContentbarWrapper(
        generateHashOfLength(6),
        (
          <div
            style={{
              padding: 8,
              minWidth: 90,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <InfoIcon />
            <span>{label}</span>
          </div>
        ),
        <div style={{ padding: 16 }}>{content}</div>,
      );

    return [
      make("Example 1", <ExampleComponent1 />),
      make("Example 2", <ExampleComponent2 />),
      make("Example 3", <ExampleComponent3 />),
      make("Example 4", <ExampleComponent4 />),
      make("Example 5", <ExampleComponent5 />),
      make("Example 6", <ExampleComponent6 />),
      make("Redux Store", <ExampleComponent7 />),
      make("Content With Bar 1", <ExampleComponent8 />),
      make("Content With Bar 2", <ExampleComponent9 />),
      make("Header Example", <ExampleComponent10 />),
    ] as CustomContentbarWrapper[];
  }, []);

  const initialSelectedId = contentTabs[0]?.id ?? "";
  const [selectedId, setSelectedId] = useState<string>(initialSelectedId);

  const legalDocuments = useMemo(
    () => [
      { path: "/imprint", titleTranslationKey: "Imprint", isHidden: false },
      {
        path: "/privacy-policy",
        titleTranslationKey: "Privacy_Policy",
        isHidden: false,
      },
    ],
    [],
  );

  if (!ui || !Header || !Navbar || !ContentWithBar || !CookieBanner) {
    return (
      <div style={{ padding: 16 }}>
        <Typography.Title level={4}>UI-Modul fehlt</Typography.Title>
        <Typography.Paragraph>
          <code>MandatoryModuleNames.UI</code> registrieren und{" "}
          <code>UILayer*</code>-Komponenten prüfen.
        </Typography.Paragraph>
      </div>
    );
  }

  const headerOptions = {
    reactElementLeft: (
      <Space size={8}>
        <Tag>IAV</Tag>
        <Typography.Text strong>Frontend Framework</Typography.Text>
      </Space>
    ),
    headerElements: [
      <Typography.Text key="title">Demo Header</Typography.Text>,
    ],
    reactElementRight: (
      <Space>
        <Button
          type="link"
          onClick={() =>
            ui?.extras?.toggleNavbar && dispatch(ui.extras.toggleNavbar())
          }
        >
          Toggle Navbar
        </Button>
        <Button type="primary">Action</Button>
      </Space>
    ),
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header headerOptions={headerOptions} />
      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        <Navbar
          tabAndContentWrappers={navbarItems}
          legalDocuments={legalDocuments}
        />
        <div style={{ flex: 1, padding: 16 }}>
          <ContentWithBar
            contentWrappers={contentTabs}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </div>
      <CookieBanner />
    </div>
  );
};
