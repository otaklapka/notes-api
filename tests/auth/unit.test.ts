import supertest = require("supertest");
import app from "../../src/app";
import {apiKey} from "../../src/config";

describe('Apikey validation', () => {

    const endpoint = '/v1/dummy/test';
    const request = supertest(app);

    it('Should response with 400 if api-key header is not passed', async () => {
        const response = await request.get(endpoint);
        expect(response.status).toBe(400);
    });

    it('Should response with 403 if wrong api-key header is passed', async () => {
        const wrongApiKey = '123';
        const response = await request
            .get(endpoint)
            .set('x-api-key', wrongApiKey);
        expect(response.status).toBe(403);
    });

    it('Should response with 404 if correct api-key header is passed and when route is not handelled', async () => {
        const response = await request
            .get(endpoint)
            .set('x-api-key', apiKey);
        expect(response.status).toBe(404);
    });
});