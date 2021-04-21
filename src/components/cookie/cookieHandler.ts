export const acceptedCookiesName = "acceptedCookies";

export function getCookie(name: string) {
    let decodedCookies = decodeURIComponent(document.cookie);
    let cookies = decodedCookies.split(";");
    let requestedCookie = cookies.find(cookie => cookie.startsWith(name + "="));
    return requestedCookie !== undefined ? requestedCookie.substring(name.length + 1, requestedCookie.length) : "";
}

export function acceptedCookies() {
    return getCookie(acceptedCookiesName) === "true";
}