import { ACCEPTED_COOKIES_NAME } from "../constants";

export const setAcceptCookies = (setCookie: (name: "acceptedCookies", value: any, options?: any) => void) => {
    const exprireDate = new Date();
    exprireDate.setUTCFullYear(exprireDate.getUTCFullYear() + 1);
    setCookie(ACCEPTED_COOKIES_NAME, 'true', { expires: exprireDate });
  };