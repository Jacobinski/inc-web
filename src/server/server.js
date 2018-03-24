import express from 'express';
import React from 'react';

const app = express();
const PORT = 8081;

app
    .use(express.static(`${__dirname}/../../`))
    .use((request, response) => {
        response.redirect('/');
    });

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
