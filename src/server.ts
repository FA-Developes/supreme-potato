import "./extentions/date";

import express from 'express';
import auth from './routes/auth';
import mongoose from "mongoose";
import morgan = require("morgan");
import UserModel from "./models/user";
import bodyParser = require("body-parser");

const app = express();
app.use(morgan("dev"))

app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*').header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, ContentType, Accept, Authorization, content-type'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
    next();
});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose
    .connect(
        `mongodb+srv://server:1234@cluster0-l3bh1.mongodb.net/test?retryWrites=true&w=majority`,
        { useNewUrlParser: true }
    )
    .catch(e => console.error(e));

app
.get('/users', (req, res) => UserModel.find().then((a) => res.json(a)))
.use('/auth', auth)


app.listen(8080, () => console.log("server started"))
