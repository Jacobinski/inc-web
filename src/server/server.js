import express from 'express';
import React from 'react';
import index from '../routes/index';
import feed from '../routes/feed';
import planner from '../routes/planner';
import profile from '../routes/profile';

const app = express();
const views = {index: '/', planner: '/planner', feed: '/feed', profile: '/profile'};
const PORT = 8080;

app
    .use(express.static(`${__dirname}/../../`))
    .use(views.index, index)
    .use(views.planner, planner)
    .use(views.feed, feed)
    .use(views.profile, profile)
    .use((request, response) => {
        response.redirect('/');
    });

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
