import express from "express";
import React from "react";

const router = express.Router();
const data = [
    {
        date: {day: 1, month: 2, year: 2018},
        workout: [
            {exercise: 'Left Handed Kneeling Row', reps: [10, 10, 8, 9], weights: [40, 45, 50, 45]},
            {exercise: 'Right Handed Kneeling Row', reps: [9, 10, 9, 9], weights: [40, 45, 50, 45]}
        ]
    },
    {
        date: {day: 2, month: 2, year: 2018},
        workout: [
            {exercise: 'Bench Press', reps: [6, 8, 8, 10], weights: [135, 225, 225, 135]},
            {exercise: 'Squat', reps: [8, 10, 10, 9], weights: [135, 225, 315, 225]}
        ]
    }
];

router.get('/', (request, response) => {
    response.json(data);
});

export default router;
