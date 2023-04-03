import express, {json, Router} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleErrors} from "./utils/handleErrors";
import rateLimit from 'express-rate-limit';
import {configCorsUrl} from "./utils/configCorsUrl";
import {userRouter} from "./routers/userRouter";
import {verificationRouter} from "./routers/verificationRouter";
import {favouriteRouter} from "./routers/favouriteRouter";
import {commentsRouter} from "./routers/commentsRouter";

const bodyParser = require('body-parser')

const app = express()


app.use(cors({
    origin: configCorsUrl,
}));
app.use(json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}))

const router = Router()
app.use('/user/', userRouter)
app.use('/verify/', verificationRouter)
app.use('/favourite/', favouriteRouter)
app.use('/comments/', commentsRouter)

// router.use('/user/', userRouter)
// router.use('/verify/', verificationRouter)
// router.use('/favourite/', favouriteRouter)
// router.use('/comments/', commentsRouter)
// app.use('/movie', router)

app.use(handleErrors)
app.listen(3001, '0.0.0.0', () => {
    console.log('listening on port http://localhost:3001')
})