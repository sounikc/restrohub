// const request = require('supertest');
// const express =  require('express');
// const server =express();
// const userRouter = require('../routes/users');
// server.use('/users',userRouter);

// describe('Test All User Routes', ()=>{
//     it('Response 400 if Email Already Registered', async()=>{
//         const res = await request(server).post('/users/register').send({
//             name: "Samir Chakraborty",
//             email:"s.c@gmail.com",
//             password: "1234577"
//         });
//         expect(res.statusCode).toBe(400);
//     })
// })