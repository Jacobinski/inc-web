import express from "express";
import React from "react";
import favicon from "serve-favicon";

const app = express();
const PORT = 8081;

app
    .use(express.static(`${__dirname}/../../`))
    .use(favicon(`${__dirname}/../../assets/img/increment_crown.png`))
    .use((request, response) => {
        response.redirect('/');
    });

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
