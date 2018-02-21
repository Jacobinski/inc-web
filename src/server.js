import express from 'express';
import React from 'react';

const app = express();
const PORT = 8080;

app.get('/', (request, response) => {
    response.send(<h1>Hi this is dog</h1>);
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
