import React from "react";
import { UICookieBannerProps } from "@iavofficial/frontend-framework-shared/cookieBannerModuleInterfaces";

const CustomCookieBanner = (props: UICookieBannerProps) => {
  const { header, message, acceptButtonLabel, visible, onAccept, styles } =
    props;

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        padding: 12,
        background: styles?.backgroundColor ?? "#111",
        color: "#fff",
        borderRadius: 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        zIndex: 9999,
      }}
      role="region"
      aria-label={header ?? "Cookie Hinweis"}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <strong>{header ?? "Cookies"}</strong>
        <span>{message ?? "Wir verwenden Cookies."}</span>
      </div>

      <button
        onClick={onAccept}
        style={{
          padding: "8px 12px",
          background: "#fff",
          color: "#111",
          border: 0,
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: 600,
        }}
        aria-label={acceptButtonLabel ?? "Cookies akzeptieren"}
      >
        {acceptButtonLabel ?? "OK"}
      </button>
    </div>
  );
};

export default CustomCookieBanner;
