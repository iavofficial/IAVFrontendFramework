export function getConfig(token, apiRoot) {
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + token
        }
    }
    return fetchJSON(apiRoot + "config", params);
}

function fetchJSON(url, ...args) {
    return fetch(url, ...args).then(response => {
        if (!response.ok) {
            throw new FetchError(response);
        }
        return response.json();
    });
}

class FetchError extends Error {
    constructor(response) {
        super("HTTP error ${response.status}");
        this.response = response;
    }
}