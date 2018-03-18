const WORKOUTS_ENDPOINT = 'http://ec2-54-183-20-248.us-west-1.compute.amazonaws.com/api/workouts';

export class WorkoutsAPI {
    static getWorkouts(username, month, year) {
        return fetch(`${WORKOUTS_ENDPOINT}?month=${month}&year=${year}&username=${username}`);
    }
}
