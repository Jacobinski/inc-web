import {DEV_URL_BASE, PROD_URL_BASE, EXERCISES_ENDPOINT} from "../client/constants.js";
const EXERCISES_API_URL = `${PROD_URL_BASE}/${EXERCISES_ENDPOINT}`;

export class ExercisesAPI {
    static getExercises(username, month, year) {
        return fetch(`${EXERCISES_API_URL}?month=${month}&year=${year}&username=${username}`);
    }
}
