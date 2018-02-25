import express from 'express';
import React from 'react';

const router = express.Router();

router.get('/', (request, response) => {
    response.send('This is your feed speaking.  Don\'t even think about it.');
});

export default router;
