"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./extentions/date");
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("./routes/auth"));
var mongoose_1 = __importDefault(require("mongoose"));
var morgan = require("morgan");
var user_1 = __importDefault(require("./models/user"));
var bodyParser = require("body-parser");
var app = express_1.default();
app.use(morgan("dev"));
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*').header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, ContentType, Accept, Authorization, content-type');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default
    .connect("mongodb+srv://server:1234@cluster0-l3bh1.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
    .catch(function (e) { return console.error(e); });
app
    .get('/users', function (req, res) { return user_1.default.find().then(function (a) { return res.json(a); }); })
    .use('/auth', auth_1.default)
    .get('/', function (req, res) { return res.send("Hello"); });
app.listen(80, function () { return console.log("server started"); });
