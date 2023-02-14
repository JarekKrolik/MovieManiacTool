import express, {json, Request, Response, Router} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleErrors, ValidationError} from "./utils/handleErrors";
import rateLimit from 'express-rate-limit';
import {configCorsUrl} from "./utils/configCorsUrl";
import {userRouter} from "./routers/userRouter";
const bodyParser = require('body-parser')

const app =express()


app.use(cors({
    origin:configCorsUrl,
}));
app.use(json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}))


app.use('/user/',userRouter)

app.use(handleErrors)
app.listen(3001,'0.0.0.0',()=>{
    console.log('listening on port http://localhost:3001')
})