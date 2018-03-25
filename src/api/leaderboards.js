const LEADERBOARDS_ENDPOINT = 'http://ec2-54-183-20-248.us-west-1.compute.amazonaws.com/api/leaderboards';

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
