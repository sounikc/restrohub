const request = require('supertest');
var express = require('express');
require('../dbconnection/connection');
var app = express();

var dishRouter = require('../routes/dishes');
app.use('/dishes', dishRouter);

describe('Test Dishes Route',()=>{
    test('Response To dishes/:id', async () => {
        const res = await request(app).get('/dishes/62fca3e0e6132f2ba8948f0f');
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.text)).toMatchObject({name: 'Chicken Reshmi Kebab'});
    })
})