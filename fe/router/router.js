const express = require("express");
const fs = require("fs");

const app = express();

const rootContext = "dist"
app.use(express.static(rootContext));

app.get("/alpha", function (req, res) {
    console.log({ req, res });
    fs.readFile("dist/alpha/index.html", (error, data) => {
        console.log({ error, data });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

app.get("/beta", function (req, res) {
    console.log({ req, res });
    fs.readFile("dist/beta/index.html", (error, data) => {
        console.log({ error, data });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

app.listen(5000, () => console.log("running server on 5000 port..."));
