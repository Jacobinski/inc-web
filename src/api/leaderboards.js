import {DEV_URL_BASE, PROD_URL_BASE, LEADERBOARDS_ENDPOINT} from "../client/constants.js";
const LEADERBOARDS_API_URL = `${PROD_URL_BASE}/${LEADERBOARDS_ENDPOINT}`;

export class LeaderboardsAPI {
    static getLeaderboards() {
        return fetch(LEADERBOARDS_API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }
}
