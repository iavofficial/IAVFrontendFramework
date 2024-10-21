document.addEventListener('DOMContentLoaded', async () => {
    const getNewestVersion = async () => {
        return await fetch("./version-list.md")
            .then(response => response.text())
            .then(data => {
                const versions = data.trim().split('\n');
                return versions[versions.length - 1];
            })
    };
    const newestVersion = await getNewestVersion();
    if (newestVersion) {
        window.location.href = `/iav-test/${newestVersion}/index.html`;
    }
});