import {useCookies} from "react-cookie";

import {ACCEPTED_COOKIES_NAME} from "../../constants";

export function useCookiesAccepted() {
    const [cookies] = useCookies([ACCEPTED_COOKIES_NAME]);
    return cookies[ACCEPTED_COOKIES_NAME] !== undefined && cookies[ACCEPTED_COOKIES_NAME] === "true";
}