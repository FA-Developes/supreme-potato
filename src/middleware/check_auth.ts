import jwt from 'jsonwebtoken';
import { UserModel } from "../models/user";
import { Request, RequestHandler } from "express";
import { config } from "../config";

export const checkAuth: RequestHandler = (req: UserRequest, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'No Auth Token' });
        }
        const token = req.headers.authorization.split(' ')[1];
        const decoded = <UserModel> jwt.verify(token, config.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Authorization error' });
    }
};

export type UserRequest = Request & {userData?: UserModel};