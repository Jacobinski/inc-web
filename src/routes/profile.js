import express from "express";
import React from "react";

const router = express.Router();
const data = {
    username: 'Jacobinski',
    data: [
        {
            date: {day: 1, month: 2, year: 2018},
            workout: [
                {exerciseID: 1, reps: [10, 10, 8, 9], weights: [135, 225, 315, 225]},
                {exerciseID: 2, reps: [9, 10, 9, 9], weights: [225, 265, 315, 285]}
            ]
        }
        ,
        {
            date: {day: 2, month: 2, year: 2018},
            workout: [
                {exerciseID: 0, reps: [6, 8, 8, 10], weights: [135, 225, 225, 135]},
                {exerciseID: 3, reps: [8, 10, 10, 9], weights: [70, 85, 105, 90]}
            ]
        }]
};

router.get('/', (request, response) => {
    response.json(data);
});

export default router;
