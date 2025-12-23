// this file contain all business logic

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from "../shared/error.handler";
import config from '../shared/config';
import db from '../shared/db';

export const register = async ({ email, password, role }) =>{
    const existingUser = await db.query(
        'SELECT id FROM auth_users WHERE email = $1',
        [ email ]
    );

    if(existingUser.rows.length > 0){
        throw new AppError('Email already registered', 400);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.query(
        `INSERT INTO auth_users (email, password_hash, role)
        VALUES ($1, $2, $3)
        RETURNING id, email, role`,
        [ email, passwordHash, role || 'user' ]
    );

    return result.rows[0];
};

export const login = async ({ email, password }) =>{
    const result = await db.query(
        'SELECT * FROM auth_users WHERE email = $1 AND is_active = true',
        [ email ]
    );

    if(result.rows.length === 0){
        throw new AppError('Invalid credentails',  401);
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if(!isMatch){
        throw new AppError('Invalid credentials', 401);
    }

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        config.auth.jwtSecret,
        { expiresIn: config.auth.jwtExpiresIn }
    );

    return { token };
};

export const verifyToken = async (token) =>{
    try {
        return jwt.verify(token, config.auth.jwtSecret);
    } catch (err) {
        throw new AppError('Invalid or expired token', 401);
    }
};