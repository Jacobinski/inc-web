const LEADERBOARDS_ENDPOINT = 'http://ec2-54-215-137-120.us-west-1.compute.amazonaws.com/api/leaderboards';

export class LeaderboardsAPI {
    static getLeaderboards() {
        return fetch(LEADERBOARDS_ENDPOINT, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }
}
