const EXERCISES_ENDPOINT = 'http://localhost:8000/api/exercises';

export class ExercisesAPI {
    static getExercises(username, month, year) {
        return fetch(`${EXERCISES_ENDPOINT}?month=${month}&year=${year}&username=${username}`);
    }
}
