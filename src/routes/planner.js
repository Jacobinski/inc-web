import express from 'express';
import React from 'react';

const router = express.Router();

router.get('/', (request, response) => {
    response.send('This is your planner speaking.  Plan more.');
});

export default router;
