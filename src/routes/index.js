import express from 'express';
import React from 'react';

const router = express.Router();

router.get('/', (request, response) => {
    response.send('index');
});

export default router;
