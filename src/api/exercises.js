const EXERCISES_ENDPOINT = 'http://ec2-54-215-137-120.us-west-1.compute.amazonaws.com/api/exercises';

export class ExercisesAPI {
    static getExercises(username, month, year) {
        return fetch(`${EXERCISES_ENDPOINT}?month=${month}&year=${year}&username=${username}`);
    }
}
