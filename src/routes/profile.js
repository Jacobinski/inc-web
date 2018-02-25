import express from 'express';
import React from 'react';

const router = express.Router();

router.get('/', (request, response) => {
    response.send('This is your profile speaking.  Profile more.');
});

export default router;
