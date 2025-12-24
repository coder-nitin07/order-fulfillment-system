import { verifyToken } from "./auth.service.js";

export const authMiddleware = async (req, res, next)=>{
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer')){
            throw new Error();
        }

        const token = authHeader.split(' ')[1];
        const payload = await verifyToken(token);

        req.user = payload;
        next();
    } catch (err) {
        console.log("faillng", err)
        res.status(401).json({ success: false, message: 'unauthorized' });
    }
};