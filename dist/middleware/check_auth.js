"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
exports.checkAuth = function (req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'No Auth Token' });
        }
        var token = req.headers.authorization.split(' ')[1];
        var decoded = jsonwebtoken_1.default.verify(token, config_1.config.JWT_SECRET);
        req.userData = decoded;
        next();
    }
    catch (e) {
        res.status(401).json({ message: 'Authorization error' });
    }
};
