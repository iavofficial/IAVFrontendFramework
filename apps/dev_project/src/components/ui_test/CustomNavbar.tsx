import React from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useModule } from "@iavofficial/frontend-framework-shared/moduleContext";
import { MandatoryModuleNames } from "@iavofficial/frontend-framework-shared/moduleNames";

type TabAndContentWrapperLike = {
  getNavbarComponent: (args: {
    navbarCollapsed: boolean;
  }) => React.ReactElement;
};

type LegalDocLike = {
  path: string;
  titleTranslationKey: string;
  isHidden?: boolean;
};

type Props = {
  tabAndContentWrappers: TabAndContentWrapperLike[];
  legalDocuments?: LegalDocLike[];
};

const CustomNavbar: React.FC<Props> = ({
  tabAndContentWrappers,
  legalDocuments,
}) => {
  const ui = useModule(MandatoryModuleNames.UI) as any;
  const router = useModule(MandatoryModuleNames.Router) as any;
  const Link = router?.Link;

  const useTypedSelector: TypedUseSelectorHook<any> = useSelector;
  const collapsed = useTypedSelector(
    (s) => s[MandatoryModuleNames.UI]?.navbarCollapsed,
  );
  const dispatch = useDispatch();

  const onToggle = () =>
    ui?.extras?.toggleNavbar && dispatch(ui.extras.toggleNavbar());

  return (
    <div
      style={{
        width: collapsed ? 72 : 260,
        borderRight: "1px solid #eee",
        padding: collapsed ? 4 : 8,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <button
        onClick={onToggle}
        style={{
          padding: 8,
          border: "1px solid #ddd",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        {collapsed ? ">" : "<"}
      </button>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {tabAndContentWrappers.map((w, i) => (
          <div key={i}>
            {w.getNavbarComponent({ navbarCollapsed: !!collapsed })}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {(legalDocuments ?? [])
          .filter((d) => !d.isHidden)
          .map((d) =>
            Link ? (
              <Link
                key={d.path}
                to={d.path}
                style={{ textDecoration: "none", fontSize: 13 }}
              >
                {d.titleTranslationKey}
              </Link>
            ) : (
              <a
                key={d.path}
                href={d.path}
                style={{ textDecoration: "none", fontSize: 13 }}
              >
                {d.titleTranslationKey}
              </a>
            ),
          )}
      </div>
    </div>
  );
};

export default CustomNavbar;
