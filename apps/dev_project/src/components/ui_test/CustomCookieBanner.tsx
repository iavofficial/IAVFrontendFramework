import React from "react";
import { useCookies } from "react-cookie";
import { ACCEPTED_COOKIES_NAME } from "@iavofficial/frontend-framework-shared/constants";
import { setAcceptCookies } from "@iavofficial/frontend-framework-shared/setAcceptCookies";

const CustomCookieBanner: React.FC = () => {
  const [, setCookie] = useCookies([ACCEPTED_COOKIES_NAME]);

  const accept = () => setAcceptCookies(setCookie);

  return (
    <div
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        padding: 12,
        background: "#111",
        color: "#fff",
        borderRadius: 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span>Wir verwenden Cookies.</span>
      <button
        onClick={accept}
        style={{
          padding: "8px 12px",
          background: "#fff",
          border: 0,
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        OK
      </button>
    </div>
  );
};

export default CustomCookieBanner;
