const express = require("express");
const fs = require("fs");

const app = express();

const rootContext = "dist"
app.use(express.static(rootContext));

app.get("/alpha", function (req, res) {
    // console.log({ req, res });
    // fs.readFile("dist/alpha/index.html", (error, data) => {
    fs.readFile("dist/alpha.html", (error, data) => {
        console.log("alpha 파일 읽기", { error, data });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

app.get("/beta", function (req, res) {
    // console.log({ req, res });
    // fs.readFile("dist/beta/index.html", (error, data) => {
    fs.readFile("dist/beta.html", (error, data) => {
        console.log("beta 파일 읽기", { error, data });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

app.listen(5000, () => console.log("running server on 5000 port..."));
