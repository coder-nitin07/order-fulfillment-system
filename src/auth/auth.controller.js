import * as authService from './auth.service.js';

export const registerController = async (req, res, next) =>{
    try {
        const user = await authService.register(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

export const logicController = async (req, res, next) =>{
    try {
        const result = await authService.login(req.body);
        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};