// const express = require("express");
// const app = express (); ES5

import express from 'express'; // ES6. (package.json type:module 설정 필요)
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDB from "./config/database.js";
const app = express();
import passport from "passport";
import authenticate from "./config/authenticate.js";
import dotenv from 'dotenv';

import blogRoutes from './routes/blog.js';
import productRoutes from './routes/product.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js'
import errorHandler from "./config/errorHandler.js";


//환경변수 설정
dotenv.config();

//db 연결
connectDB()

app.use(passport.initialize());
authenticate(passport)
// require("./config/authenticate.js");

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())
app.use(morgan('dev')) // dev version of morgan


// routing
app.use("/api/blog", blogRoutes)
app.use("/api/product", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)


// error Handler
app.use(errorHandler) //원래 try catch 를 써야하는데 이걸 자동으로 해서 빼버리기 위해 error Handler 사용

// const PORT = 8000;
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));