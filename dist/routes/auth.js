"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var controller = __importStar(require("../controllers/user"));
var check_auth_1 = require("../middleware/check_auth");
router
    //Parameters: email, name, password, confirmPassword
    .post('/signup', controller.signup)
    //Parameters: email, password
    .post('/login', controller.login)
    .get('/user', check_auth_1.checkAuth, controller.get_me);
exports.default = router;
