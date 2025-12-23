import * as userService from './user.service.js';

export const createProfileController = async (req, res, next) => {
  try {
    const profile = await userService.createUserProfile(
      req.user.userId,
      req.body
    );

    res.status(201).json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

export const getProfileController = async (req, res, next) => {
  try {
    const profile = await userService.getUserProfile(req.user.userId);

    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

export const updateProfileController = async (req, res, next) => {
  try {
    const profile = await userService.updateUserProfile(
      req.user.userId,
      req.body
    );

    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};