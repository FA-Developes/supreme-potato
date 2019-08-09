import { RequestHandler } from 'express';
import User, { UserModel } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRequest } from "../middleware/check_auth";
import { config } from "../config";
// import { mailTransport } from './mails';

export const login: RequestHandler = async (req, res) => {
    try {
        let user = <UserModel | null>await User.findOne({
            email: req.body.email
        })
            .select('passwordHash')
            .exec();
        if (!user) {
            return res
                .status(401)
                .json({
                    message: 'Email or Password wrong, please try again.'
                });
        }
        let matches = await bcrypt.compare(
            req.body.password,
            user.passwordHash
        );
        if (!matches) {
            res.status(401).json({
                message: 'Email or Password wrong, please try again.'
            });
        } else {
            res.status(200).json(createToken(user));
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

export const signup: RequestHandler = async (req, res) => {
    try {
        if (!req.body.password) {
            return res.status(400).json({ message: 'Password is required!' });
        }
        if (req.body.password != req.body.confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match!" });
        }

        let duplicateUser = <UserModel | null>await User.findOne({
            $or: [{ email: req.body.email }, { name: req.body.name }]
        }).exec();

        if (duplicateUser) {
            let message: string;

            if (
                duplicateUser.name == req.body.name &&
                duplicateUser.email == req.body.email
            ) {
                message = 'Name and E-Mail are already taken';
            } else if (duplicateUser.name == req.body.name) {
                message = 'Name is already taken, pick another one';
            } else {
                message =
                    'E-Mail is already taken, try logging in or reset your Password';
            }

            return res.status(409).json({ message });
        }
        let hash = await bcrypt.hash(req.body.password, 10);
        const newUser = new User(<any>{
            name: req.body.name,
            email: req.body.email,
            passwordHash: hash,
            createdOn: new Date()
        });
        let user = <any>await newUser.save();
        // await mailTransport.sendMail({
        //     from: 'Flo',
        //     to: req.body.email,
        //     subject: 'Sign up successful!',
        //     text: `Welcome ${
        //         req.body.name
        //     }, you successfuly signed up on this Website`,
        //     sender: 'Meeee!'
        // });
        res.status(201).json(createToken(user));
    } catch (e) {
        return res.status(500).json(e);
    }
};

export const get_me: RequestHandler = async (req: UserRequest, res) => {
    if (req.userData) {
        const user = await User.findById(req.userData._id).exec();
        res.status(200).json(user);
    } else {
        return res.status(403).json({message: 'No Permission for this action'});
    }
};

//TODO: Make Admin only
export const get_all: RequestHandler = async (req: UserRequest, res) => {
    if (req.userData) {
        const users = await User.find().exec();
        return res.status(200).json(users);
    } else {
        return res.status(403).json({message: 'No Permission for this action'});
    }
}; 

export const verify_name: RequestHandler = async (req, res) => {
    if (await User.findOne({ name: req.params.name })) {
        res.status(400).send();
    } else {
        res.status(200).send();
    }
};

function createToken(user: UserModel) {
    return {
        token: jwt.sign(
            { email: user.email, _id: user._id, isAdmin: user.isAdmin },
            config.JWT_SECRET,
            { expiresIn: '1h' }
        ),
        _id: user._id,
        name: user.name,
        expires: new Date().addHours(1)
    };
}
