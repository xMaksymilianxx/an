class FootballAPI {
    constructor() {
        this.apiKey = 'ac0417c6e0dcfa236b146b9585892c9a';
        this.baseUrl = 'https://v3.football.api-sports.io';
        this.headers = {
            'x-rapidapi-key': this.apiKey,
            'x-rapidapi-host': 'v3.football.api-sports.io'
        };
    }

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                headers: this.headers
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async getLeagues() {
        return await this.fetchData('/leagues');
    }

    async getFixtures(date) {
        return await this.fetchData(`/fixtures/date/${date}`);
    }

    async getTeamStatistics(teamId, leagueId, season) {
        return await this.fetchData(`/teams/statistics?team=${teamId}&league=${leagueId}&season=${season}`);
    }

    async getH2H(team1Id, team2Id) {
        return await this.fetchData(`/fixtures/headtohead?h2h=${team1Id}-${team2Id}`);
    }

    async getTeamForm(teamId, last = 5) {
        return await this.fetchData(`/fixtures/team/${teamId}/last/${last}`);
    }

    async getFixtureStatistics(fixtureId) {
        return await this.fetchData(`/fixtures/statistics?fixture=${fixtureId}`);
    }

    async getOdds(fixtureId) {
        return await this.fetchData(`/odds?fixture=${fixtureId}`);
    }
}
