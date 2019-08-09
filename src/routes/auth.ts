import express from 'express';
const router = express.Router();
import * as controller from "../controllers/user";
import { checkAuth } from "../middleware/check_auth";


router
    //Parameters: email, name, password, confirmPassword
    .post('/signup', controller.signup)
    //Parameters: email, password
    .post('/login', controller.login)
    .get('/user',checkAuth, controller.get_me)
export default router;