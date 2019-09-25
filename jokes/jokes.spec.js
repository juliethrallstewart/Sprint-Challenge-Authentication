const axios = require('axios');


describe('GET /api/jokes', () => {

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })


    it('should retrieve a joke', () => {
        axios.get('https://icanhazdadjoke.com/search')
            .then(res => {
                let jokes = res.data.results
                expect(jokes[0]).toHaveProperty('joke')
            })
    })
})


