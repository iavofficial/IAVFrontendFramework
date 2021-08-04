const fs = require("fs");
fs.readFile("./package.json", (err, data) => {
    if (err) throw err;
    let packageJsonObj = JSON.parse(data);
    packageJsonObj.name = "@" + process.env.REPO_ROOT_NAMESPACE + "/" + packageJsonObj.name;
    fs.writeFile("./package.json", JSON.stringify(packageJsonObj), (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    });
});
