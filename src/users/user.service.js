import db from "../shared/db.js";
import { AppError } from "../shared/error.handler.js";

export const createUserProfile = async (authUserId, data)=>{
    const existing = await db.query(
        'SELECT id FROM user_profiles WHERE auth_user_id = $1',
        [ authUserId ]
    );
    
    if(existing.rows.length > 0){
        throw new AppError('Profile already exists', 400);
    }

    const result = await db.query(
        `INSERT INTO user_profiles (auth_user_id, name, phone)
        VALUES ($1, $2, $3)
        RETURNING id, auth_user_id, name, phone`,
        [ authUserId, data.name, data.phone ]
    );

    return result.rows[0];
};

export const getUserProfile = async (authUserId)=>{
    const result = await db.query(
        'SELECT id, auth_user_id, name, phone FROM user_profiles WHERE auth_user_id = $1',
        [ authUserId ]
    );

    if(result.rows.length === 0){
        throw new AppError('Profile not found',  404);
    }

    return result.rows[0];
};

export const updateUserProfile = async (authUserId, data)=>{
    const result = await db.query(
        `UPDATE user_profiles
        SET name = $1, phone = $2, updated_at = CURRENT_TIMESTAMP
        WHERE auth_user_id = $3
        RETURNING id, auth_user_id, name, phone`,
        [ data.name, data.phone, authUserId ]
  );

  if(result.rows.length === 0){
    throw new AppError('Profile not found', 404);
  }

  return result.rows[0];
};