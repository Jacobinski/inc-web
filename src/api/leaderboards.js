const LEADERBOARDS_ENDPOINT = 'http://localhost:8000/api/leaderboards';

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
