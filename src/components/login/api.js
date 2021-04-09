export function getConfig(rootURL, token) {
    const args = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "bearer" + token
        }
    }
    return fetchJSON(rootURL + "config", args);
}

function fetchJSON(url, args) {
    return fetch(url, args).then(response => {
        if(response.ok){
            return response.json();
        }
        throw new FetchError(response);
    })
}

class FetchError extends Error {
    constructor(response) {
        super("HTTP error ${response.status}");
        this.response = response;
    }
}