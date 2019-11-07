const assert = require('assert');
const request = require('supertest');
const api = require('.');
const app = api.app;

describe('THE WEATHER APP', () => {
    describe('erroneous url', () => {
        it('returns 404', (done) => {
            request(app)
                .get('/error')
                .expect(404, done);
        });
    });

    describe('GET /nearby weather', () => {
        it('returns status 200 OK', (done) => {
            request(app)
                .get('/nearby?lat=20&lon=40')
                .set('Accept', 'application/json')
                .expect(200, done);
        });

        it('returns JSON', (done) => {
            request(app)
                .get('/nearby?lat=20&lon=50')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/, done);
        });


    });

    describe('GET /search/city', () => {
        it('returns data in json format', (done) => {
            request(app)
                .get('/search/Oslo')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/, done);
        });

        it('returns status 200 OK', (done) => {
            request(app)
                .get('/search/Oslo')
                .set('Accept', 'application/json')
                .expect(200, done);
        });

        it('returns data for a city ', (done) => {
            request(app)
                .get('/search/Oslo')
                .set('Accept', 'application/json')
                .expect((res) => {
                    assert.equal(res.body.name, 'Oslo');
                })
                .end(done);
        });
    });

    describe('GET failures for unexisting city', () => {
        it('returns 404 for a city which does not exist', (done) => {
            request(app)
                .get('/search/xxxxxxx')
                .set('Accept', 'application/json')
                .expect((res) => {
                    assert.equal(res.body.message, 'City name not found');
                })
                .end(done);
        });
    });
});