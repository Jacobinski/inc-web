const WORKOUTS_ENDPOINT = 'http://localhost:8000/api/workouts';

export class WorkoutsAPI {
    static getWorkouts(username, month, year) {
        return fetch(`${WORKOUTS_ENDPOINT}?month=${month}&year=${year}&username=${username}`);
    }
}
