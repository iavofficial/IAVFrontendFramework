export function getConfig(token: any, apiRoot: String | string) {
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer " + token
        }
    }
    return fetchJSON(apiRoot + "config", params);
}

function fetchJSON(url: string, ...args: { method: string }[]) {
    return fetch(url, ...args).then(response => {
        if (!response.ok) {
            throw new FetchError(response);
        }
        return response.json();
    });
}

class FetchError extends Error {
    constructor(private _response: Response) {
        super("HTTP error ${_response.status}");
    }

    get response() {
        return this._response;
    }
}